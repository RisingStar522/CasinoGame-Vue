"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3;
try {
    sqlite3 = require('sqlite3');
}
catch (e) { }
var SQLiteDatabase = (function () {
    function SQLiteDatabase(options) {
        var _this = this;
        this.options = options;
        if (!sqlite3)
            return;
        var path = process.cwd() + options.databaseConfig.sqlite.databasePath;
        this._sqlite = new sqlite3.cached.Database(path);
        this._sqlite.serialize(function () {
            _this._sqlite.run('CREATE TABLE IF NOT EXISTS key_value (key VARCHAR(255), value TEXT)');
            _this._sqlite.run('CREATE UNIQUE INDEX IF NOT EXISTS key_index ON key_value (key)');
        });
    }
    SQLiteDatabase.prototype.get = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._sqlite.get("SELECT value FROM key_value WHERE key = $key", {
                $key: key,
            }, function (error, row) {
                if (error) {
                    reject(error);
                }
                var result = row ? JSON.parse(row.value) : null;
                resolve(result);
            });
        });
    };
    SQLiteDatabase.prototype.set = function (key, value) {
        this._sqlite.run("INSERT OR REPLACE INTO key_value (key, value) VALUES ($key, $value)", {
            $key: key,
            $value: JSON.stringify(value)
        });
    };
    return SQLiteDatabase;
}());
exports.SQLiteDatabase = SQLiteDatabase;
