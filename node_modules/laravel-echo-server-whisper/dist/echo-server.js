"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscribers_1 = require("./subscribers");
var channels_1 = require("./channels");
var server_1 = require("./server");
var api_1 = require("./api");
var log_1 = require("./log");
var packageFile = require('../package.json');
var constants = require('crypto').constants;
var EchoServer = (function () {
    function EchoServer() {
        this.defaultOptions = {
            authHost: 'http://localhost',
            authEndpoint: '/broadcasting/auth',
            clients: [],
            database: 'redis',
            databaseConfig: {
                redis: {},
                sqlite: {
                    databasePath: '/database/laravel-echo-server.sqlite'
                },
                listenWhishper: true,
                prefixWhishper: "whishper."
            },
            devMode: false,
            host: null,
            port: 6001,
            protocol: "http",
            socketio: {},
            secureOptions: constants.SSL_OP_NO_TLSv1,
            sslCertPath: '',
            sslKeyPath: '',
            sslCertChainPath: '',
            sslPassphrase: '',
            subscribers: {
                http: true,
                redis: true
            },
            apiOriginAllow: {
                allowCors: false,
                allowOrigin: '',
                allowMethods: '',
                allowHeaders: ''
            }
        };
    }
    EchoServer.prototype.run = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.options = Object.assign(_this.defaultOptions, options);
            _this.startup();
            _this.server = new server_1.Server(_this.options);
            _this.server.init().then(function (io) {
                _this.init(io).then(function () {
                    log_1.Log.info('\nServer ready!\n');
                    resolve(_this);
                }, function (error) { return log_1.Log.error(error); });
            }, function (error) { return log_1.Log.error(error); });
        });
    };
    EchoServer.prototype.init = function (io) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.channel = new channels_1.Channel(io, _this.options);
            _this.subscribers = [];
            if (_this.options.subscribers.http)
                _this.subscribers.push(new subscribers_1.HttpSubscriber(_this.server.express, _this.options));
            if (_this.options.subscribers.redis)
                _this.subscribers.push(new subscribers_1.RedisSubscriber(_this.options));
            _this.httpApi = new api_1.HttpApi(io, _this.channel, _this.server.express, _this.options.apiOriginAllow);
            _this.httpApi.init();
            _this.onConnect();
            _this.listen().then(function () { return resolve(); }, function (err) { return log_1.Log.error(err); });
        });
    };
    EchoServer.prototype.startup = function () {
        log_1.Log.title("\nL A R A V E L  E C H O  S E R V E R\n");
        log_1.Log.info("version " + packageFile.version + "\n");
        if (this.options.devMode) {
            log_1.Log.warning('Starting server in DEV mode...\n');
        }
        else {
            log_1.Log.info('Starting server...\n');
        }
    };
    EchoServer.prototype.stop = function () {
        var _this = this;
        console.log('Stopping the LARAVEL ECHO SERVER');
        var promises = [];
        this.subscribers.forEach(function (subscriber) {
            promises.push(subscriber.unsubscribe());
        });
        promises.push(this.server.io.close());
        return Promise.all(promises).then(function () {
            _this.subscribers = [];
            console.log('The LARAVEL ECHO SERVER server has been stopped.');
        });
    };
    EchoServer.prototype.listen = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var subscribePromises = _this.subscribers.map(function (subscriber) {
                return subscriber.subscribe(function (channel, message) {
                    return _this.broadcast(channel, message);
                });
            });
            Promise.all(subscribePromises).then(function () { return resolve(); });
        });
    };
    EchoServer.prototype.find = function (socket_id) {
        return this.server.io.sockets.connected[socket_id];
    };
    EchoServer.prototype.broadcast = function (channel, message) {
        if (message.socket && this.find(message.socket)) {
            return this.toOthers(this.find(message.socket), channel, message);
        }
        else {
            return this.toAll(channel, message);
        }
    };
    EchoServer.prototype.toOthers = function (socket, channel, message) {
        socket.flags['local'] = true;
        socket.broadcast.to(channel).local
            .emit(message.event, channel, message.data);
        return true;
    };
    EchoServer.prototype.toAll = function (channel, message) {
        this.server.io.to(channel).local
            .emit(message.event, channel, message.data);
        return true;
    };
    EchoServer.prototype.onConnect = function () {
        var _this = this;
        this.server.io.on('connection', function (socket) {
            _this.onSubscribe(socket);
            _this.onUnsubscribe(socket);
            _this.onDisconnecting(socket);
            _this.onClientEvent(socket);
        });
    };
    EchoServer.prototype.onSubscribe = function (socket) {
        var _this = this;
        socket.on('subscribe', function (data) {
            _this.channel.join(socket, data);
        });
    };
    EchoServer.prototype.onUnsubscribe = function (socket) {
        var _this = this;
        socket.on('unsubscribe', function (data) {
            _this.channel.leave(socket, data.channel, 'unsubscribed');
        });
    };
    EchoServer.prototype.onDisconnecting = function (socket) {
        var _this = this;
        socket.on('disconnecting', function (reason) {
            Object.keys(socket.rooms).forEach(function (room) {
                if (room !== socket.id) {
                    _this.channel.leave(socket, room, reason);
                }
            });
        });
    };
    EchoServer.prototype.onClientEvent = function (socket) {
        var _this = this;
        socket.on('client event', function (data) {
            _this.channel.clientEvent(socket, data);
        });
    };
    return EchoServer;
}());
exports.EchoServer = EchoServer;
