"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite_1 = require("./sqlite");
var redis_1 = require("./redis");
var log_1 = require("./../log");
var Database = (function () {
    function Database(options) {
        this.options = options;
        if (options.database == 'redis') {
            this.driver = new redis_1.RedisDatabase(options);
        }
        else if (options.database == 'sqlite') {
            this.driver = new sqlite_1.SQLiteDatabase(options);
        }
        else {
            log_1.Log.error('Database driver not set.');
        }
    }
    Database.prototype.get = function (key) {
        return this.driver.get(key);
    };
    ;
    Database.prototype.set = function (key, value) {
        this.driver.set(key, value);
    };
    ;
    return Database;
}());
exports.Database = Database;
