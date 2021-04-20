"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_1 = require("./../log");
var url = require('url');
var HttpSubscriber = (function () {
    function HttpSubscriber(express, options) {
        this.express = express;
        this.options = options;
    }
    HttpSubscriber.prototype.subscribe = function (callback) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.express.post('/apps/:appId/events', function (req, res) {
                var body = [];
                res.on('error', function (error) {
                    if (_this.options.devMode) {
                        log_1.Log.error(error);
                    }
                });
                req.on('data', function (chunk) { return body.push(chunk); })
                    .on('end', function () { return _this.handleData(req, res, body, callback); });
            });
            log_1.Log.success('Listening for http events...');
            resolve();
        });
    };
    HttpSubscriber.prototype.unsubscribe = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.express.post('/apps/:appId/events', function (req, res) {
                    res.status(404).send();
                });
                resolve();
            }
            catch (e) {
                reject('Could not overwrite the event endpoint -> ' + e);
            }
        });
    };
    HttpSubscriber.prototype.handleData = function (req, res, body, broadcast) {
        body = JSON.parse(Buffer.concat(body).toString());
        if ((body.channels || body.channel) && body.name && body.data) {
            var data = body.data;
            try {
                data = JSON.parse(data);
            }
            catch (e) { }
            var message = {
                event: body.name,
                data: data,
                socket: body.socket_id
            };
            var channels = body.channels || [body.channel];
            if (this.options.devMode) {
                log_1.Log.info("Channel: " + channels.join(', '));
                log_1.Log.info("Event: " + message.event);
            }
            channels.forEach(function (channel) { return broadcast(channel, message); });
        }
        else {
            return this.badResponse(req, res, 'Event must include channel, event name and data');
        }
        res.json({ message: 'ok' });
    };
    HttpSubscriber.prototype.badResponse = function (req, res, message) {
        res.statusCode = 400;
        res.json({ error: message });
        return false;
    };
    return HttpSubscriber;
}());
exports.HttpSubscriber = HttpSubscriber;
