"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var colors = require("colors");
var _ = require("lodash");
var echo = require("./../../dist");
var inquirer = require("inquirer");
var crypto = require("crypto");
var Cli = (function () {
    function Cli() {
        this.envVariables = {
            LARAVEL_ECHO_SERVER_AUTH_HOST: "authHost",
            LARAVEL_ECHO_SERVER_DEBUG: "devMode",
            LARAVEL_ECHO_SERVER_HOST: "host",
            LARAVEL_ECHO_SERVER_PORT: "port",
            LARAVEL_ECHO_SERVER_REDIS_HOST: "databaseConfig.redis.host",
            LARAVEL_ECHO_SERVER_REDIS_PORT: "databaseConfig.redis.port",
            LARAVEL_ECHO_SERVER_REDIS_PASSWORD: "databaseConfig.redis.password",
            LARAVEL_ECHO_SERVER_REDIS_WHISHPER_PREFIX: "databaseConfig.prefixWhishper",
            LARAVEL_ECHO_SERVER_PROTO: "protocol",
            LARAVEL_ECHO_SERVER_SSL_CERT: "sslCertPath",
            LARAVEL_ECHO_SERVER_SSL_KEY: "sslKeyPath",
            LARAVEL_ECHO_SERVER_SSL_CHAIN: "sslCertChainPath",
            LARAVEL_ECHO_SERVER_SSL_PASS: "sslPassphrase"
        };
        this.defaultOptions = echo.defaultOptions;
    }
    Cli.prototype.configure = function (yargs) {
        var _this = this;
        yargs.option({
            config: {
                type: "string",
                default: "laravel-echo-server.json",
                describe: "The name of the config file to create."
            }
        });
        this.setupConfig(yargs.argv.config).then(function (options) {
            options = Object.assign({}, _this.defaultOptions, options);
            if (options.addClient) {
                var client = {
                    appId: _this.createAppId(),
                    key: _this.createApiKey()
                };
                options.clients.push(client);
                console.log("appId: " + colors.magenta(client.appId));
                console.log("key: " + colors.magenta(client.key));
            }
            if (options.corsAllow) {
                options.apiOriginAllow.allowCors = true;
                options.apiOriginAllow.allowOrigin = options.allowOrigin;
                options.apiOriginAllow.allowMethods = options.allowMethods;
                options.apiOriginAllow.allowHeaders = options.allowHeaders;
            }
            _this.saveConfig(options).then(function (file) {
                console.log("Configuration file saved. Run " +
                    colors.magenta.bold("laravel-echo-server start" +
                        (file != "laravel-echo-server.json"
                            ? ' --config="' + file + '"'
                            : "")) +
                    " to run server.");
                process.exit();
            }, function (error) {
                console.error(colors.error(error));
            });
        }, function (error) { return console.error(error); });
    };
    Cli.prototype.resolveEnvFileOptions = function (options) {
        require("dotenv").config();
        for (var key in this.envVariables) {
            var value = (process.env[key] || "").toString();
            var replacementVar = void 0;
            if (value) {
                var path_1 = this.envVariables[key].split(".");
                var modifier = options;
                while (path_1.length > 1) {
                    modifier = modifier[path_1.shift()];
                }
                if ((replacementVar = value.match(/\${(.*?)}/))) {
                    value = (process.env[replacementVar[1]] || "").toString();
                }
                modifier[path_1.shift()] = value;
            }
        }
        return options;
    };
    Cli.prototype.setupConfig = function (defaultFile) {
        return inquirer.prompt([
            {
                name: "devMode",
                default: false,
                message: "Do you want to run this server in development mode?",
                type: "confirm"
            },
            {
                name: "port",
                default: "6001",
                message: "Which port would you like to serve from?"
            },
            {
                name: "database",
                message: "Which database would you like to use to store presence channel members?",
                type: "list",
                choices: ["redis", "sqlite"]
            },
            {
                name: "authHost",
                default: "http://localhost",
                message: "Enter the host of your Laravel authentication server."
            },
            {
                name: "protocol",
                message: "Will you be serving on http or https?",
                type: "list",
                choices: ["http", "https"]
            },
            {
                name: "sslCertPath",
                message: "Enter the path to your SSL cert file.",
                when: function (options) {
                    return options.protocol == "https";
                }
            },
            {
                name: "sslKeyPath",
                message: "Enter the path to your SSL key file.",
                when: function (options) {
                    return options.protocol == "https";
                }
            },
            {
                name: "addClient",
                default: false,
                message: "Do you want to generate a client ID/Key for HTTP API?",
                type: "confirm"
            },
            {
                name: "corsAllow",
                default: false,
                message: "Do you want to setup cross domain access to the API?",
                type: "confirm"
            },
            {
                name: "allowOrigin",
                default: "http://localhost:80",
                message: "Specify the URI that may access the API:",
                when: function (options) {
                    return options.corsAllow == true;
                }
            },
            {
                name: "allowMethods",
                default: "GET, POST",
                message: "Enter the HTTP methods that are allowed for CORS:",
                when: function (options) {
                    return options.corsAllow == true;
                }
            },
            {
                name: "allowHeaders",
                default: "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id",
                message: "Enter the HTTP headers that are allowed for CORS:",
                when: function (options) {
                    return options.corsAllow == true;
                }
            },
            {
                name: "file",
                default: defaultFile,
                message: "What do you want this config to be saved as?"
            }
        ]);
    };
    Cli.prototype.saveConfig = function (options) {
        var _this = this;
        var opts = {};
        Object.keys(options)
            .filter(function (k) {
            return Object.keys(_this.defaultOptions).indexOf(k) >= 0;
        })
            .forEach(function (option) { return (opts[option] = options[option]); });
        return new Promise(function (resolve, reject) {
            if (opts) {
                fs.writeFile(_this.getConfigFile(options.file), JSON.stringify(opts, null, "\t"), function (error) { return (error ? reject(error) : resolve(options.file)); });
            }
            else {
                reject("No options provided.");
            }
        });
    };
    Cli.prototype.start = function (yargs) {
        var _this = this;
        yargs.option({
            config: {
                type: "string",
                describe: "The config file to use."
            },
            dir: {
                type: "string",
                describe: "The working directory to use."
            },
            force: {
                type: "boolean",
                describe: "If a server is already running, stop it."
            },
            dev: {
                type: "boolean",
                describe: "Run in dev mode."
            }
        });
        var configFile = this.getConfigFile(yargs.argv.config, yargs.argv.dir);
        fs.access(configFile, fs.F_OK, function (error) {
            if (error) {
                console.error(colors.error("Error: The config file could not be found."));
                return false;
            }
            var options = _this.readConfigFile(configFile);
            options.devMode =
                "" + (yargs.argv.dev || options.devMode || false) === "true";
            var lockFilePostFix = path.basename(configFile, ".json") + ".lock";
            if (process.env.NODE_APP_INSTANCE != undefined && _.toInteger(process.env.NODE_APP_INSTANCE) > 0) {
                lockFilePostFix = path.basename(configFile, ".json") + "." + process.env.NODE_APP_INSTANCE + ".lock";
            }
            var lockFile = path.join(path.dirname(configFile), lockFilePostFix);
            if (fs.existsSync(lockFile)) {
                var lockProcess = void 0;
                try {
                    lockProcess = parseInt(JSON.parse(fs.readFileSync(lockFile, "utf8")).process);
                }
                catch (_a) {
                    console.error(colors.error("Error: There was a problem reading the existing lock file."));
                }
                if (lockProcess) {
                    try {
                        process.kill(lockProcess, 0);
                        if (yargs.argv.force) {
                            process.kill(lockProcess);
                            console.log(colors.yellow("Warning: Closing process " +
                                lockProcess +
                                " because you used the '--force' option."));
                        }
                        else {
                            console.error(colors.error("Error: There is already a server running! Use the option '--force' to stop it and start another one."));
                            return false;
                        }
                    }
                    catch (_b) {
                    }
                }
            }
            fs.writeFile(lockFile, JSON.stringify({ process: process.pid }, null, "\t"), function (error) {
                if (error) {
                    console.error(colors.error("Error: Cannot write lock file."));
                    return false;
                }
                process.on("exit", function () {
                    try {
                        fs.unlinkSync(lockFile);
                    }
                    catch (_a) { }
                });
                process.on("SIGINT", function () { return process.exit(); });
                process.on("SIGHUP", function () { return process.exit(); });
                process.on("SIGTERM", function () { return process.exit(); });
                echo.run(options);
            });
        });
    };
    Cli.prototype.stop = function (yargs) {
        yargs.option({
            config: {
                type: "string",
                describe: "The config file to use."
            },
            dir: {
                type: "string",
                describe: "The working directory to use."
            }
        });
        var configFile = this.getConfigFile(yargs.argv.config, yargs.argv.dir);
        var lockFile = path.join(path.dirname(configFile), path.basename(configFile, ".json") + ".lock");
        if (fs.existsSync(lockFile)) {
            var lockProcess = void 0;
            try {
                lockProcess = parseInt(JSON.parse(fs.readFileSync(lockFile, "utf8")).process);
            }
            catch (_a) {
                console.error(colors.error("Error: There was a problem reading the lock file."));
            }
            if (lockProcess) {
                try {
                    fs.unlinkSync(lockFile);
                    process.kill(lockProcess);
                    console.log(colors.green("Closed the running server."));
                }
                catch (e) {
                    console.error(e);
                    console.log(colors.error("No running servers to close."));
                }
            }
        }
        else {
            console.log(colors.error("Error: Could not find any lock file."));
        }
    };
    Cli.prototype.getRandomString = function (bytes) {
        return crypto.randomBytes(bytes).toString("hex");
    };
    Cli.prototype.createApiKey = function () {
        return this.getRandomString(16);
    };
    Cli.prototype.createAppId = function () {
        return this.getRandomString(8);
    };
    Cli.prototype.clientAdd = function (yargs) {
        yargs.option({
            config: {
                type: "string",
                describe: "The config file to use."
            },
            dir: {
                type: "string",
                describe: "The working directory to use."
            }
        });
        var options = this.readConfigFile(this.getConfigFile(yargs.argv.config, yargs.argv.dir));
        var appId = yargs.argv._[1] || this.createAppId();
        options.clients = options.clients || [];
        if (appId) {
            var index_1 = null;
            var client = options.clients.find(function (client, i) {
                index_1 = i;
                return client.appId == appId;
            });
            if (client) {
                client.key = this.createApiKey();
                options.clients[index_1] = client;
                console.log(colors.green("API Client updated!"));
            }
            else {
                client = {
                    appId: appId,
                    key: this.createApiKey()
                };
                options.clients.push(client);
                console.log(colors.green("API Client added!"));
            }
            console.log(colors.magenta("appId: " + client.appId));
            console.log(colors.magenta("key: " + client.key));
            this.saveConfig(options);
        }
    };
    Cli.prototype.clientRemove = function (yargs) {
        yargs.option({
            config: {
                type: "string",
                describe: "The config file to use."
            },
            dir: {
                type: "string",
                describe: "The working directory to use."
            }
        });
        var options = this.readConfigFile(this.getConfigFile(yargs.argv.config, yargs.argv.dir));
        var appId = yargs.argv._[1] || null;
        options.clients = options.clients || [];
        var index = null;
        var client = options.clients.find(function (client, i) {
            index = i;
            return client.appId == appId;
        });
        if (index >= 0) {
            options.clients.splice(index, 1);
        }
        console.log(colors.green("Client removed: " + appId));
        this.saveConfig(options);
    };
    Cli.prototype.getConfigFile = function (file, dir) {
        if (file === void 0) { file = null; }
        if (dir === void 0) { dir = null; }
        var filePath = path.join(dir || "", file || "laravel-echo-server.json");
        return path.isAbsolute(filePath)
            ? filePath
            : path.join(process.cwd(), filePath);
    };
    Cli.prototype.readConfigFile = function (file) {
        var data = {};
        try {
            data = JSON.parse(fs.readFileSync(file, "utf8"));
        }
        catch (_a) {
            console.error(colors.error("Error: There was a problem reading the config file."));
            process.exit();
        }
        return this.resolveEnvFileOptions(data);
    };
    return Cli;
}());
exports.Cli = Cli;
