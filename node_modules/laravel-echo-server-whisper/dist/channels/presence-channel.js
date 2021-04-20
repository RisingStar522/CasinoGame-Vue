"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./../database");
var log_1 = require("./../log");
var _ = require("lodash");
var PresenceChannel = (function () {
    function PresenceChannel(io, options) {
        this.io = io;
        this.options = options;
        this.db = new database_1.Database(options);
    }
    PresenceChannel.prototype.getMembers = function (channel) {
        return this.db.get(channel + ":members");
    };
    PresenceChannel.prototype.isMember = function (channel, member) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getMembers(channel).then(function (members) {
                _this.removeInactive(channel, members, member).then(function (members) {
                    var search = members.filter(function (m) { return m.user_id == member.user_id; });
                    if (search && search.length) {
                        resolve(true);
                    }
                    resolve(false);
                });
            }, function (error) { return log_1.Log.error(error); });
        });
    };
    PresenceChannel.prototype.removeInactive = function (channel, members, member) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.io
                .of("/")
                .in(channel)
                .clients(function (error, clients) {
                members = members || [];
                members = members.filter(function (member) {
                    return clients.indexOf(member.socketId) >= 0;
                });
                _this.db.set(channel + ":members", members);
                resolve(members);
            });
        });
    };
    PresenceChannel.prototype.join = function (socket, channel, member) {
        var _this = this;
        if (!member) {
            if (this.options.devMode) {
                log_1.Log.error("Unable to join channel. Member data for presence channel missing");
            }
            return;
        }
        this.isMember(channel, member).then(function (is_member) {
            _this.getMembers(channel).then(function (members) {
                members = members || [];
                member.socketId = socket.id;
                members.push(member);
                _this.db.set(channel + ":members", members);
                members = _.uniqBy(members.reverse(), "user_id");
                _this.onSubscribed(socket, channel, members);
                if (!is_member) {
                    _this.onJoin(socket, channel, member);
                }
            }, function (error) { return log_1.Log.error(error); });
        }, function () {
            log_1.Log.error("Error retrieving pressence channel members.");
        });
    };
    PresenceChannel.prototype.leave = function (socket, channel) {
        var _this = this;
        this.getMembers(channel).then(function (members) {
            members = members || [];
            var member = members.find(function (member) { return member.socketId == socket.id; });
            members = members.filter(function (m) { return m.socketId != member.socketId; });
            _this.db.set(channel + ":members", members);
            _this.isMember(channel, member).then(function (is_member) {
                if (!is_member) {
                    delete member.socketId;
                    _this.onLeave(channel, member);
                }
            });
        }, function (error) { return log_1.Log.error(error); });
    };
    PresenceChannel.prototype.onJoin = function (socket, channel, member) {
        if (!_.isUndefined(this.io.sockets.connected[socket.id].broadcast)) {
            this.io.sockets.connected[socket.id].broadcast
                .to(channel)
                .emit("presence:joining", channel, member);
        }
    };
    PresenceChannel.prototype.onLeave = function (channel, member) {
        this.io.to(channel).emit("presence:leaving", channel, member);
    };
    PresenceChannel.prototype.onSubscribed = function (socket, channel, members) {
        this.io.to(socket.id).emit("presence:subscribed", channel, members);
    };
    return PresenceChannel;
}());
exports.PresenceChannel = PresenceChannel;
