"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require('colors');
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'cyan',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    h1: 'grey',
    h2: 'yellow'
});
var Log = (function () {
    function Log() {
    }
    Log.title = function (message) {
        console.log(colors.bold(message));
    };
    Log.subtitle = function (message) {
        console.log(colors.h2.bold(message));
    };
    Log.info = function (message) {
        console.log(colors.info(message));
    };
    Log.success = function (message) {
        console.log(colors.green('\u2714 '), message);
    };
    Log.error = function (message) {
        console.log(colors.error(message));
    };
    Log.warning = function (message) {
        console.log(colors.warn('\u26A0 ' + message));
    };
    return Log;
}());
exports.Log = Log;
