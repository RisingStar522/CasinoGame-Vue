"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require('ioredis');
var RedisDatabase = (function () {
    function RedisDatabase(options) {
        this.options = options;
        this._redis = new Redis(options.databaseConfig.redis);
    }
    RedisDatabase.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._redis.get(key).then(function (value) { return resolve(JSON.parse(value)); });
        });
    };
    RedisDatabase.prototype.set = function (key, value) {
        this._redis.set(key, JSON.stringify(value));
        if (this.options.databaseConfig.publishPresence === true && /^presence-.*:members$/.test(key)) {
            this._redis.publish('PresenceChannelUpdated', JSON.stringify({
                "event": {
                    "channel": key,
                    "members": value
                }
            }));
        }
    };
    return RedisDatabase;
}());
exports.RedisDatabase = RedisDatabase;
