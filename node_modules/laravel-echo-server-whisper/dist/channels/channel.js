"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var presence_channel_1 = require("./presence-channel");
var private_channel_1 = require("./private-channel");
var log_1 = require("./../log");
var Redis = require('ioredis');
var Channel = (function () {
    function Channel(io, options) {
        this.io = io;
        this.options = options;
        this._privateChannels = ['private-*', 'presence-*'];
        this._clientEvents = ['client-*'];
        this._pub = new Redis(options.databaseConfig.redis);
        this.private = new private_channel_1.PrivateChannel(options);
        this.presence = new presence_channel_1.PresenceChannel(io, options);
        if (this.options.devMode) {
            log_1.Log.success('Channels are ready.');
        }
    }
    Channel.prototype.join = function (socket, data) {
        if (data.channel) {
            if (this.isPrivate(data.channel)) {
                this.joinPrivate(socket, data);
            }
            else {
                socket.join(data.channel);
                this.onJoin(socket, data.channel);
            }
        }
    };
    Channel.prototype.clientEvent = function (socket, data) {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            data = data;
        }
        if (data.event && data.channel) {
            if (this.isClientEvent(data.event) &&
                this.isPrivate(data.channel) &&
                this.isInChannel(socket, data.channel)) {
                if (this.options.databaseConfig.listenWhishper === true) {
                    this._pub.publish(this.options.databaseConfig.prefixWhishper + "." + data.channel, JSON.stringify({ event: data.event, data: data.data }));
                }
                this.io.sockets.connected[socket.id]
                    .broadcast.to(data.channel)
                    .emit(data.event, data.channel, data.data);
            }
        }
    };
    Channel.prototype.leave = function (socket, channel, reason) {
        if (channel) {
            if (this.isPresence(channel)) {
                this.presence.leave(socket, channel);
            }
            socket.leave(channel);
            if (this.options.devMode) {
                log_1.Log.info("[" + new Date().toLocaleTimeString() + "] - " + socket.id + " left channel: " + channel + " (" + reason + ")");
            }
        }
    };
    Channel.prototype.isPrivate = function (channel) {
        var isPrivate = false;
        this._privateChannels.forEach(function (privateChannel) {
            var regex = new RegExp(privateChannel.replace('\*', '.*'));
            if (regex.test(channel))
                isPrivate = true;
        });
        return isPrivate;
    };
    Channel.prototype.joinPrivate = function (socket, data) {
        var _this = this;
        this.private.authenticate(socket, data).then(function (res) {
            socket.join(data.channel);
            if (_this.isPresence(data.channel)) {
                var member = res.channel_data;
                try {
                    member = JSON.parse(res.channel_data);
                }
                catch (e) { }
                _this.presence.join(socket, data.channel, member);
            }
            _this.onJoin(socket, data.channel);
        }, function (error) {
            if (_this.options.devMode) {
                log_1.Log.error(error.reason);
            }
            _this.io.sockets.to(socket.id)
                .emit('subscription_error', data.channel, error.status);
        });
    };
    Channel.prototype.isPresence = function (channel) {
        return channel.lastIndexOf('presence-', 0) === 0;
    };
    Channel.prototype.onJoin = function (socket, channel) {
        if (this.options.devMode) {
            log_1.Log.info("[" + new Date().toLocaleTimeString() + "] - " + socket.id + " joined channel: " + channel);
        }
    };
    Channel.prototype.isClientEvent = function (event) {
        var isClientEvent = false;
        this._clientEvents.forEach(function (clientEvent) {
            var regex = new RegExp(clientEvent.replace('\*', '.*'));
            if (regex.test(event))
                isClientEvent = true;
        });
        return isClientEvent;
    };
    Channel.prototype.isInChannel = function (socket, channel) {
        return !!socket.rooms[channel];
    };
    return Channel;
}());
exports.Channel = Channel;
