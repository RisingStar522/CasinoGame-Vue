"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @prettier
 */
var express = require("express");
var httpProxy = require("http-proxy");
var url = require("url");
var Bluebird = require("bluebird");
var path = require("path");
var _ = require("lodash");
var debugLib = require("debug");
var https = require("https");
var http = require("http");
var morgan = require("morgan");
var fs = Bluebird.promisifyAll(require('fs'));
var config_1 = require("./config");
var debug = debugLib('bitgo:express');
// eslint-disable-next-line @typescript-eslint/camelcase
var constants_1 = require("constants");
var errors_1 = require("./errors");
var bitgo_1 = require("bitgo");
var clientRoutes_1 = require("./clientRoutes");
var version = require('bitgo/package.json').version;
var pjson = require('../package.json');
var BITGOEXPRESS_USER_AGENT = "BitGoExpress/" + pjson.version + " BitGoJS/" + version;
/**
 * Set up the logging middleware provided by morgan
 *
 * @param app
 * @param config
 */
function setupLogging(app, config) {
    // Set up morgan for logging, with optional logging into a file
    var middleware;
    if (config.logFile) {
        // create a write stream (in append mode)
        var accessLogPath = path.resolve(config.logFile);
        var accessLogStream = fs.createWriteStream(accessLogPath, { flags: 'a' });
        console.log('Log location: ' + accessLogPath);
        // setup the logger
        middleware = morgan('combined', { stream: accessLogStream });
    }
    else {
        middleware = morgan('combined');
    }
    app.use(middleware);
    morgan.token('remote-user', function (req) {
        return req.isProxy ? 'proxy' : 'local_express';
    });
}
/**
 * If we're running in a custom env, set the appropriate environment URI and network properties
 *
 * @param config
 */
function configureEnvironment(config) {
    var customRootUri = config.customRootUri, customBitcoinNetwork = config.customBitcoinNetwork;
    if (customRootUri) {
        bitgo_1.Environments['custom'].uri = customRootUri;
    }
    if (customBitcoinNetwork) {
        bitgo_1.Environments['custom'].network = customBitcoinNetwork;
    }
}
/**
 * Create and configure the proxy middleware and add it to the app middleware stack
 *
 * @param app bitgo-express Express app
 * @param config
 */
function configureProxy(app, config) {
    var env = config.env, timeout = config.timeout;
    // Mount the proxy middleware
    var options = {
        timeout: timeout,
        proxyTimeout: timeout,
        secure: true,
    };
    if (bitgo_1.Environments[env].network === 'testnet') {
        // Need to do this to make supertest agent pass (set rejectUnauthorized to false)
        options.secure = false;
    }
    var proxy = httpProxy.createProxyServer(options);
    var sendError = function (res, status, json) {
        res.writeHead(status, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(json));
    };
    proxy.on('proxyReq', function (proxyReq, req) {
        // Need to rewrite the host, otherwise cross-site protection kicks in
        var parsedUri = url.parse(bitgo_1.Environments[env].uri).hostname;
        if (parsedUri) {
            proxyReq.setHeader('host', parsedUri);
        }
        var userAgent = req.headers['user-agent']
            ? BITGOEXPRESS_USER_AGENT + ' ' + req.headers['user-agent']
            : BITGOEXPRESS_USER_AGENT;
        proxyReq.setHeader('User-Agent', userAgent);
    });
    proxy.on('error', function (err, _, res) {
        debug('Proxy server error: ', err);
        sendError(res, 500, {
            error: 'BitGo Express encountered an error while attempting to proxy your request to BitGo. Please try again.',
        });
    });
    proxy.on('econnreset', function (err, _, res) {
        debug('Proxy server connection reset error: ', err);
        sendError(res, 500, {
            error: 'BitGo Express encountered a connection reset error while attempting to proxy your request to BitGo. Please try again.',
        });
    });
    app.use(function (req, res) {
        if (req.url && (/^\/api\/v[12]\/.*$/.test(req.url) || /^\/oauth\/token.*$/.test(req.url))) {
            req.isProxy = true;
            proxy.web(req, res, { target: bitgo_1.Environments[env].uri, changeOrigin: true });
            return;
        }
        // user tried to access a url which is not an api route, do not proxy
        res.status(404).send('bitgo-express can only proxy BitGo API requests');
    });
}
/**
 * Create an HTTP server configured for accepting HTTPS connections
 *
 * @param config application configuration
 * @param app
 * @return {Server}
 */
function createHttpsServer(app, config) {
    return __awaiter(this, void 0, void 0, function () {
        var keyPath, crtPath, privateKeyPromise, certificatePromise, _a, key, cert;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    keyPath = config.keyPath, crtPath = config.crtPath;
                    privateKeyPromise = fs.readFileAsync(keyPath, 'utf8');
                    certificatePromise = fs.readFileAsync(crtPath, 'utf8');
                    return [4 /*yield*/, Promise.all([privateKeyPromise, certificatePromise])];
                case 1:
                    _a = _b.sent(), key = _a[0], cert = _a[1];
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    return [2 /*return*/, https.createServer({ secureOptions: constants_1.SSL_OP_NO_TLSv1, key: key, cert: cert }, app)];
            }
        });
    });
}
/**
 * Create an HTTP server configured for accepting plain old HTTP connections
 *
 * @param app
 * @return {Server}
 */
function createHttpServer(app) {
    return http.createServer(app);
}
/**
 * Create a startup function which will be run upon server initialization
 *
 * @param config
 * @param baseUri
 * @return {Function}
 */
function startup(config, baseUri) {
    return function () {
        var env = config.env, customRootUri = config.customRootUri, customBitcoinNetwork = config.customBitcoinNetwork;
        console.log('BitGo-Express running');
        console.log("Environment: " + env);
        console.log("Base URI: " + baseUri);
        if (customRootUri) {
            console.log("Custom root URI: " + customRootUri);
        }
        if (customBitcoinNetwork) {
            console.log("Custom bitcoin network: " + customBitcoinNetwork);
        }
    };
}
exports.startup = startup;
/**
 * helper function to determine whether we should run the server over TLS or not
 */
function isTLS(config) {
    var keyPath = config.keyPath, crtPath = config.crtPath;
    return Boolean(keyPath && crtPath);
}
/**
 * Create either a HTTP or HTTPS server
 * @param config
 * @param app
 * @return {Server}
 */
function createServer(config, app) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isTLS(config)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createHttpsServer(app, config)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = createHttpServer(app);
                    _b.label = 3;
                case 3: return [2 /*return*/, _a];
            }
        });
    });
}
exports.createServer = createServer;
/**
 * Create the base URI where the BitGoExpress server will be available once started
 * @return {string}
 */
function createBaseUri(config) {
    var bind = config.bind, port = config.port;
    var tls = isTLS(config);
    var isStandardPort = (port === 80 && !tls) || (port === 443 && tls);
    return "http" + (tls ? 's' : '') + "://" + bind + (!isStandardPort ? ':' + port : '');
}
exports.createBaseUri = createBaseUri;
/**
 * Check environment and other preconditions to ensure bitgo-express can start safely
 * @param config
 */
function checkPreconditions(config) {
    var env = config.env, disableEnvCheck = config.disableEnvCheck, bind = config.bind, disableSSL = config.disableSSL, keyPath = config.keyPath, crtPath = config.crtPath, customRootUri = config.customRootUri, customBitcoinNetwork = config.customBitcoinNetwork;
    // warn or throw if the NODE_ENV is not production when BITGO_ENV is production - this can leak system info from express
    if (env === 'prod' && process.env.NODE_ENV !== 'production') {
        if (!disableEnvCheck) {
            throw new errors_1.NodeEnvironmentError('NODE_ENV should be set to production when running against prod environment. Use --disableenvcheck if you really want to run in a non-production node configuration.');
        }
        else {
            console.warn("warning: unsafe NODE_ENV '" + process.env.NODE_ENV + "'. NODE_ENV must be set to 'production' when running against BitGo production environment.");
        }
    }
    var needsTLS = env === 'prod' && bind !== 'localhost' && !disableSSL;
    // make sure keyPath and crtPath are set when running over TLS
    if (needsTLS && !(keyPath && crtPath)) {
        throw new errors_1.TlsConfigurationError('Must enable TLS when running against prod and listening on external interfaces!');
    }
    if (Boolean(keyPath) !== Boolean(crtPath)) {
        throw new errors_1.TlsConfigurationError('Must provide both keypath and crtpath when running in TLS mode!');
    }
    if ((customRootUri || customBitcoinNetwork) && env !== 'custom') {
        console.warn("customRootUri or customBitcoinNetwork is set, but env is '" + env + "'. Setting env to 'custom'.");
        config.env = 'custom';
    }
}
function app(cfg) {
    debug('app is initializing');
    var app = express();
    setupLogging(app, cfg);
    var debugNamespace = cfg.debugNamespace, disableProxy = cfg.disableProxy;
    // enable specified debug namespaces
    if (_.isArray(debugNamespace)) {
        _.forEach(debugNamespace, function (ns) { return debugLib.enable(ns); });
    }
    checkPreconditions(cfg);
    // Be more robust about accepting URLs with double slashes
    app.use(function (req, res, next) {
        req.url = req.url.replace(/\/\//g, '/');
        next();
    });
    // Decorate the client routes
    clientRoutes_1.setupRoutes(app, cfg);
    configureEnvironment(cfg);
    if (!disableProxy) {
        configureProxy(app, cfg);
    }
    return app;
}
exports.app = app;
function init() {
    return __awaiter(this, void 0, Bluebird, function () {
        var cfg, expressApp, server, port, bind, baseUri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cfg = config_1.config();
                    expressApp = app(cfg);
                    return [4 /*yield*/, createServer(cfg, expressApp)];
                case 1:
                    server = _a.sent();
                    port = cfg.port, bind = cfg.bind;
                    baseUri = createBaseUri(cfg);
                    server.listen(port, bind, startup(cfg, baseUri));
                    server.timeout = 300 * 1000; // 5 minutes
                    return [2 /*return*/];
            }
        });
    });
}
exports.init = init;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc0FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leHByZXNzQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILGlDQUFtQztBQUNuQyxzQ0FBd0M7QUFDeEMseUJBQTJCO0FBQzNCLG1DQUFxQztBQUNyQywyQkFBNkI7QUFDN0IsMEJBQTRCO0FBQzVCLGdDQUFrQztBQUNsQyw2QkFBK0I7QUFDL0IsMkJBQTZCO0FBQzdCLCtCQUFpQztBQUdqQyxJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRWhELG1DQUEwQztBQUUxQyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFeEMsd0RBQXdEO0FBQ3hELHVDQUE0QztBQUM1QyxtQ0FBdUU7QUFFdkUsK0JBQXFDO0FBQ3JDLCtDQUE2QztBQUNyQyxJQUFBLCtDQUFPLENBQW1DO0FBQ2xELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXpDLElBQU0sdUJBQXVCLEdBQUcsa0JBQWdCLEtBQUssQ0FBQyxPQUFPLGlCQUFZLE9BQVMsQ0FBQztBQUVuRjs7Ozs7R0FLRztBQUNILFNBQVMsWUFBWSxDQUFDLEdBQXdCLEVBQUUsTUFBYztJQUM1RCwrREFBK0Q7SUFDL0QsSUFBSSxVQUFVLENBQUM7SUFDZixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7UUFDbEIseUNBQXlDO1FBQ3pDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztR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LENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLFlBQVk7Ozs7O0NBQzFDO0FBWEQsb0JBV0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQHByZXR0aWVyXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgKiBhcyBodHRwUHJveHkgZnJvbSAnaHR0cC1wcm94eSc7XHJcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xyXG5pbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgZGVidWdMaWIgZnJvbSAnZGVidWcnO1xyXG5pbXBvcnQgKiBhcyBodHRwcyBmcm9tICdodHRwcyc7XHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCc7XHJcbmltcG9ydCAqIGFzIG1vcmdhbiBmcm9tICdtb3JnYW4nO1xyXG5pbXBvcnQgeyBSZXF1ZXN0IGFzIFN0YXRpY1JlcXVlc3QgfSBmcm9tICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJztcclxuXHJcbmNvbnN0IGZzID0gQmx1ZWJpcmQucHJvbWlzaWZ5QWxsKHJlcXVpcmUoJ2ZzJykpO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnLCBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XHJcblxyXG5jb25zdCBkZWJ1ZyA9IGRlYnVnTGliKCdiaXRnbzpleHByZXNzJyk7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxyXG5pbXBvcnQgeyBTU0xfT1BfTk9fVExTdjEgfSBmcm9tICdjb25zdGFudHMnO1xyXG5pbXBvcnQgeyBOb2RlRW52aXJvbm1lbnRFcnJvciwgVGxzQ29uZmlndXJhdGlvbkVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xyXG5cclxuaW1wb3J0IHsgRW52aXJvbm1lbnRzIH0gZnJvbSAnYml0Z28nO1xyXG5pbXBvcnQgeyBzZXR1cFJvdXRlcyB9IGZyb20gJy4vY2xpZW50Um91dGVzJztcclxuY29uc3QgeyB2ZXJzaW9uIH0gPSByZXF1aXJlKCdiaXRnby9wYWNrYWdlLmpzb24nKTtcclxuY29uc3QgcGpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcclxuXHJcbmNvbnN0IEJJVEdPRVhQUkVTU19VU0VSX0FHRU5UID0gYEJpdEdvRXhwcmVzcy8ke3Bqc29uLnZlcnNpb259IEJpdEdvSlMvJHt2ZXJzaW9ufWA7XHJcblxyXG4vKipcclxuICogU2V0IHVwIHRoZSBsb2dnaW5nIG1pZGRsZXdhcmUgcHJvdmlkZWQgYnkgbW9yZ2FuXHJcbiAqXHJcbiAqIEBwYXJhbSBhcHBcclxuICogQHBhcmFtIGNvbmZpZ1xyXG4gKi9cclxuZnVuY3Rpb24gc2V0dXBMb2dnaW5nKGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbiwgY29uZmlnOiBDb25maWcpOiB2b2lkIHtcclxuICAvLyBTZXQgdXAgbW9yZ2FuIGZvciBsb2dnaW5nLCB3aXRoIG9wdGlvbmFsIGxvZ2dpbmcgaW50byBhIGZpbGVcclxuICBsZXQgbWlkZGxld2FyZTtcclxuICBpZiAoY29uZmlnLmxvZ0ZpbGUpIHtcclxuICAgIC8vIGNyZWF0ZSBhIHdyaXRlIHN0cmVhbSAoaW4gYXBwZW5kIG1vZGUpXHJcbiAgICBjb25zdCBhY2Nlc3NMb2dQYXRoID0gcGF0aC5yZXNvbHZlKGNvbmZpZy5sb2dGaWxlKTtcclxuICAgIGNvbnN0IGFjY2Vzc0xvZ1N0cmVhbSA9IGZzLmNyZWF0ZVdyaXRlU3RyZWFtKGFjY2Vzc0xvZ1BhdGgsIHsgZmxhZ3M6ICdhJyB9KTtcclxuICAgIGNvbnNvbGUubG9nKCdMb2cgbG9jYXRpb246ICcgKyBhY2Nlc3NMb2dQYXRoKTtcclxuICAgIC8vIHNldHVwIHRoZSBsb2dnZXJcclxuICAgIG1pZGRsZXdhcmUgPSBtb3JnYW4oJ2NvbWJpbmVkJywgeyBzdHJlYW06IGFjY2Vzc0xvZ1N0cmVhbSB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgbWlkZGxld2FyZSA9IG1vcmdhbignY29tYmluZWQnKTtcclxuICB9XHJcblxyXG4gIGFwcC51c2UobWlkZGxld2FyZSk7XHJcbiAgbW9yZ2FuLnRva2VuKCdyZW1vdGUtdXNlcicsIGZ1bmN0aW9uKHJlcSkge1xyXG4gICAgcmV0dXJuIHJlcS5pc1Byb3h5ID8gJ3Byb3h5JyA6ICdsb2NhbF9leHByZXNzJztcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBjdXN0b20gZW52LCBzZXQgdGhlIGFwcHJvcHJpYXRlIGVudmlyb25tZW50IFVSSSBhbmQgbmV0d29yayBwcm9wZXJ0aWVzXHJcbiAqXHJcbiAqIEBwYXJhbSBjb25maWdcclxuICovXHJcbmZ1bmN0aW9uIGNvbmZpZ3VyZUVudmlyb25tZW50KGNvbmZpZzogQ29uZmlnKTogdm9pZCB7XHJcbiAgY29uc3QgeyBjdXN0b21Sb290VXJpLCBjdXN0b21CaXRjb2luTmV0d29yayB9ID0gY29uZmlnO1xyXG4gIGlmIChjdXN0b21Sb290VXJpKSB7XHJcbiAgICBFbnZpcm9ubWVudHNbJ2N1c3RvbSddLnVyaSA9IGN1c3RvbVJvb3RVcmk7XHJcbiAgfVxyXG5cclxuICBpZiAoY3VzdG9tQml0Y29pbk5ldHdvcmspIHtcclxuICAgIEVudmlyb25tZW50c1snY3VzdG9tJ10ubmV0d29yayA9IGN1c3RvbUJpdGNvaW5OZXR3b3JrO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgY29uZmlndXJlIHRoZSBwcm94eSBtaWRkbGV3YXJlIGFuZCBhZGQgaXQgdG8gdGhlIGFwcCBtaWRkbGV3YXJlIHN0YWNrXHJcbiAqXHJcbiAqIEBwYXJhbSBhcHAgYml0Z28tZXhwcmVzcyBFeHByZXNzIGFwcFxyXG4gKiBAcGFyYW0gY29uZmlnXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25maWd1cmVQcm94eShhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24sIGNvbmZpZzogQ29uZmlnKTogdm9pZCB7XHJcbiAgY29uc3QgeyBlbnYsIHRpbWVvdXQgfSA9IGNvbmZpZztcclxuXHJcbiAgLy8gTW91bnQgdGhlIHByb3h5IG1pZGRsZXdhcmVcclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgdGltZW91dDogdGltZW91dCxcclxuICAgIHByb3h5VGltZW91dDogdGltZW91dCxcclxuICAgIHNlY3VyZTogdHJ1ZSxcclxuICB9O1xyXG5cclxuICBpZiAoRW52aXJvbm1lbnRzW2Vudl0ubmV0d29yayA9PT0gJ3Rlc3RuZXQnKSB7XHJcbiAgICAvLyBOZWVkIHRvIGRvIHRoaXMgdG8gbWFrZSBzdXBlcnRlc3QgYWdlbnQgcGFzcyAoc2V0IHJlamVjdFVuYXV0aG9yaXplZCB0byBmYWxzZSlcclxuICAgIG9wdGlvbnMuc2VjdXJlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm94eSA9IGh0dHBQcm94eS5jcmVhdGVQcm94eVNlcnZlcihvcHRpb25zKTtcclxuXHJcbiAgY29uc3Qgc2VuZEVycm9yID0gKHJlczogaHR0cC5TZXJ2ZXJSZXNwb25zZSwgc3RhdHVzOiBudW1iZXIsIGpzb246IG9iamVjdCkgPT4ge1xyXG4gICAgcmVzLndyaXRlSGVhZChzdGF0dXMsIHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xyXG4gIH07XHJcblxyXG4gIHByb3h5Lm9uKCdwcm94eVJlcScsIGZ1bmN0aW9uKHByb3h5UmVxLCByZXEpIHtcclxuICAgIC8vIE5lZWQgdG8gcmV3cml0ZSB0aGUgaG9zdCwgb3RoZXJ3aXNlIGNyb3NzLXNpdGUgcHJvdGVjdGlvbiBraWNrcyBpblxyXG4gICAgY29uc3QgcGFyc2VkVXJpID0gdXJsLnBhcnNlKEVudmlyb25tZW50c1tlbnZdLnVyaSkuaG9zdG5hbWU7XHJcbiAgICBpZiAocGFyc2VkVXJpKSB7XHJcbiAgICAgIHByb3h5UmVxLnNldEhlYWRlcignaG9zdCcsIHBhcnNlZFVyaSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXNlckFnZW50ID0gcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXVxyXG4gICAgICA/IEJJVEdPRVhQUkVTU19VU0VSX0FHRU5UICsgJyAnICsgcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXVxyXG4gICAgICA6IEJJVEdPRVhQUkVTU19VU0VSX0FHRU5UO1xyXG4gICAgcHJveHlSZXEuc2V0SGVhZGVyKCdVc2VyLUFnZW50JywgdXNlckFnZW50KTtcclxuICB9KTtcclxuXHJcbiAgcHJveHkub24oJ2Vycm9yJywgKGVyciwgXywgcmVzKSA9PiB7XHJcbiAgICBkZWJ1ZygnUHJveHkgc2VydmVyIGVycm9yOiAnLCBlcnIpO1xyXG4gICAgc2VuZEVycm9yKHJlcywgNTAwLCB7XHJcbiAgICAgIGVycm9yOiAnQml0R28gRXhwcmVzcyBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIHByb3h5IHlvdXIgcmVxdWVzdCB0byBCaXRHby4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIHByb3h5Lm9uKCdlY29ubnJlc2V0JywgKGVyciwgXywgcmVzKSA9PiB7XHJcbiAgICBkZWJ1ZygnUHJveHkgc2VydmVyIGNvbm5lY3Rpb24gcmVzZXQgZXJyb3I6ICcsIGVycik7XHJcbiAgICBzZW5kRXJyb3IocmVzLCA1MDAsIHtcclxuICAgICAgZXJyb3I6XHJcbiAgICAgICAgJ0JpdEdvIEV4cHJlc3MgZW5jb3VudGVyZWQgYSBjb25uZWN0aW9uIHJlc2V0IGVycm9yIHdoaWxlIGF0dGVtcHRpbmcgdG8gcHJveHkgeW91ciByZXF1ZXN0IHRvIEJpdEdvLiBQbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgYXBwLnVzZShmdW5jdGlvbihyZXE6IFN0YXRpY1JlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkge1xyXG4gICAgaWYgKHJlcS51cmwgJiYgKC9eXFwvYXBpXFwvdlsxMl1cXC8uKiQvLnRlc3QocmVxLnVybCkgfHwgL15cXC9vYXV0aFxcL3Rva2VuLiokLy50ZXN0KHJlcS51cmwpKSkge1xyXG4gICAgICByZXEuaXNQcm94eSA9IHRydWU7XHJcbiAgICAgIHByb3h5LndlYihyZXEsIHJlcywgeyB0YXJnZXQ6IEVudmlyb25tZW50c1tlbnZdLnVyaSwgY2hhbmdlT3JpZ2luOiB0cnVlIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciB0cmllZCB0byBhY2Nlc3MgYSB1cmwgd2hpY2ggaXMgbm90IGFuIGFwaSByb3V0ZSwgZG8gbm90IHByb3h5XHJcbiAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCgnYml0Z28tZXhwcmVzcyBjYW4gb25seSBwcm94eSBCaXRHbyBBUEkgcmVxdWVzdHMnKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbiBIVFRQIHNlcnZlciBjb25maWd1cmVkIGZvciBhY2NlcHRpbmcgSFRUUFMgY29ubmVjdGlvbnNcclxuICpcclxuICogQHBhcmFtIGNvbmZpZyBhcHBsaWNhdGlvbiBjb25maWd1cmF0aW9uXHJcbiAqIEBwYXJhbSBhcHBcclxuICogQHJldHVybiB7U2VydmVyfVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlSHR0cHNTZXJ2ZXIoYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uLCBjb25maWc6IENvbmZpZyk6IFByb21pc2U8aHR0cHMuU2VydmVyPiB7XHJcbiAgY29uc3QgeyBrZXlQYXRoLCBjcnRQYXRoIH0gPSBjb25maWc7XHJcbiAgY29uc3QgcHJpdmF0ZUtleVByb21pc2UgPSBmcy5yZWFkRmlsZUFzeW5jKGtleVBhdGgsICd1dGY4Jyk7XHJcbiAgY29uc3QgY2VydGlmaWNhdGVQcm9taXNlID0gZnMucmVhZEZpbGVBc3luYyhjcnRQYXRoLCAndXRmOCcpO1xyXG5cclxuICBjb25zdCBba2V5LCBjZXJ0XSA9IGF3YWl0IFByb21pc2UuYWxsKFtwcml2YXRlS2V5UHJvbWlzZSwgY2VydGlmaWNhdGVQcm9taXNlXSk7XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlXHJcbiAgcmV0dXJuIGh0dHBzLmNyZWF0ZVNlcnZlcih7IHNlY3VyZU9wdGlvbnM6IFNTTF9PUF9OT19UTFN2MSwga2V5LCBjZXJ0IH0sIGFwcCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gSFRUUCBzZXJ2ZXIgY29uZmlndXJlZCBmb3IgYWNjZXB0aW5nIHBsYWluIG9sZCBIVFRQIGNvbm5lY3Rpb25zXHJcbiAqXHJcbiAqIEBwYXJhbSBhcHBcclxuICogQHJldHVybiB7U2VydmVyfVxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlSHR0cFNlcnZlcihhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24pOiBodHRwLlNlcnZlciB7XHJcbiAgcmV0dXJuIGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBzdGFydHVwIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgcnVuIHVwb24gc2VydmVyIGluaXRpYWxpemF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBjb25maWdcclxuICogQHBhcmFtIGJhc2VVcmlcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RhcnR1cChjb25maWc6IENvbmZpZywgYmFzZVVyaTogc3RyaW5nKTogKCkgPT4gdm9pZCB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgeyBlbnYsIGN1c3RvbVJvb3RVcmksIGN1c3RvbUJpdGNvaW5OZXR3b3JrIH0gPSBjb25maWc7XHJcbiAgICBjb25zb2xlLmxvZygnQml0R28tRXhwcmVzcyBydW5uaW5nJyk7XHJcbiAgICBjb25zb2xlLmxvZyhgRW52aXJvbm1lbnQ6ICR7ZW52fWApO1xyXG4gICAgY29uc29sZS5sb2coYEJhc2UgVVJJOiAke2Jhc2VVcml9YCk7XHJcbiAgICBpZiAoY3VzdG9tUm9vdFVyaSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhgQ3VzdG9tIHJvb3QgVVJJOiAke2N1c3RvbVJvb3RVcml9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VzdG9tQml0Y29pbk5ldHdvcmspIHtcclxuICAgICAgY29uc29sZS5sb2coYEN1c3RvbSBiaXRjb2luIG5ldHdvcms6ICR7Y3VzdG9tQml0Y29pbk5ldHdvcmt9YCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgd2hldGhlciB3ZSBzaG91bGQgcnVuIHRoZSBzZXJ2ZXIgb3ZlciBUTFMgb3Igbm90XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1RMUyhjb25maWc6IENvbmZpZyk6IGJvb2xlYW4ge1xyXG4gIGNvbnN0IHsga2V5UGF0aCwgY3J0UGF0aCB9ID0gY29uZmlnO1xyXG4gIHJldHVybiBCb29sZWFuKGtleVBhdGggJiYgY3J0UGF0aCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgZWl0aGVyIGEgSFRUUCBvciBIVFRQUyBzZXJ2ZXJcclxuICogQHBhcmFtIGNvbmZpZ1xyXG4gKiBAcGFyYW0gYXBwXHJcbiAqIEByZXR1cm4ge1NlcnZlcn1cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTZXJ2ZXIoY29uZmlnOiBDb25maWcsIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbikge1xyXG4gIHJldHVybiBpc1RMUyhjb25maWcpID8gYXdhaXQgY3JlYXRlSHR0cHNTZXJ2ZXIoYXBwLCBjb25maWcpIDogY3JlYXRlSHR0cFNlcnZlcihhcHApO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHRoZSBiYXNlIFVSSSB3aGVyZSB0aGUgQml0R29FeHByZXNzIHNlcnZlciB3aWxsIGJlIGF2YWlsYWJsZSBvbmNlIHN0YXJ0ZWRcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJhc2VVcmkoY29uZmlnOiBDb25maWcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHsgYmluZCwgcG9ydCB9ID0gY29uZmlnO1xyXG4gIGNvbnN0IHRscyA9IGlzVExTKGNvbmZpZyk7XHJcbiAgY29uc3QgaXNTdGFuZGFyZFBvcnQgPSAocG9ydCA9PT0gODAgJiYgIXRscykgfHwgKHBvcnQgPT09IDQ0MyAmJiB0bHMpO1xyXG4gIHJldHVybiBgaHR0cCR7dGxzID8gJ3MnIDogJyd9Oi8vJHtiaW5kfSR7IWlzU3RhbmRhcmRQb3J0ID8gJzonICsgcG9ydCA6ICcnfWA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVjayBlbnZpcm9ubWVudCBhbmQgb3RoZXIgcHJlY29uZGl0aW9ucyB0byBlbnN1cmUgYml0Z28tZXhwcmVzcyBjYW4gc3RhcnQgc2FmZWx5XHJcbiAqIEBwYXJhbSBjb25maWdcclxuICovXHJcbmZ1bmN0aW9uIGNoZWNrUHJlY29uZGl0aW9ucyhjb25maWc6IENvbmZpZykge1xyXG4gIGNvbnN0IHsgZW52LCBkaXNhYmxlRW52Q2hlY2ssIGJpbmQsIGRpc2FibGVTU0wsIGtleVBhdGgsIGNydFBhdGgsIGN1c3RvbVJvb3RVcmksIGN1c3RvbUJpdGNvaW5OZXR3b3JrIH0gPSBjb25maWc7XHJcblxyXG4gIC8vIHdhcm4gb3IgdGhyb3cgaWYgdGhlIE5PREVfRU5WIGlzIG5vdCBwcm9kdWN0aW9uIHdoZW4gQklUR09fRU5WIGlzIHByb2R1Y3Rpb24gLSB0aGlzIGNhbiBsZWFrIHN5c3RlbSBpbmZvIGZyb20gZXhwcmVzc1xyXG4gIGlmIChlbnYgPT09ICdwcm9kJyAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICBpZiAoIWRpc2FibGVFbnZDaGVjaykge1xyXG4gICAgICB0aHJvdyBuZXcgTm9kZUVudmlyb25tZW50RXJyb3IoXHJcbiAgICAgICAgJ05PREVfRU5WIHNob3VsZCBiZSBzZXQgdG8gcHJvZHVjdGlvbiB3aGVuIHJ1bm5pbmcgYWdhaW5zdCBwcm9kIGVudmlyb25tZW50LiBVc2UgLS1kaXNhYmxlZW52Y2hlY2sgaWYgeW91IHJlYWxseSB3YW50IHRvIHJ1biBpbiBhIG5vbi1wcm9kdWN0aW9uIG5vZGUgY29uZmlndXJhdGlvbi4nXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgYHdhcm5pbmc6IHVuc2FmZSBOT0RFX0VOViAnJHtwcm9jZXNzLmVudi5OT0RFX0VOVn0nLiBOT0RFX0VOViBtdXN0IGJlIHNldCB0byAncHJvZHVjdGlvbicgd2hlbiBydW5uaW5nIGFnYWluc3QgQml0R28gcHJvZHVjdGlvbiBlbnZpcm9ubWVudC5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBuZWVkc1RMUyA9IGVudiA9PT0gJ3Byb2QnICYmIGJpbmQgIT09ICdsb2NhbGhvc3QnICYmICFkaXNhYmxlU1NMO1xyXG5cclxuICAvLyBtYWtlIHN1cmUga2V5UGF0aCBhbmQgY3J0UGF0aCBhcmUgc2V0IHdoZW4gcnVubmluZyBvdmVyIFRMU1xyXG4gIGlmIChuZWVkc1RMUyAmJiAhKGtleVBhdGggJiYgY3J0UGF0aCkpIHtcclxuICAgIHRocm93IG5ldyBUbHNDb25maWd1cmF0aW9uRXJyb3IoJ011c3QgZW5hYmxlIFRMUyB3aGVuIHJ1bm5pbmcgYWdhaW5zdCBwcm9kIGFuZCBsaXN0ZW5pbmcgb24gZXh0ZXJuYWwgaW50ZXJmYWNlcyEnKTtcclxuICB9XHJcblxyXG4gIGlmIChCb29sZWFuKGtleVBhdGgpICE9PSBCb29sZWFuKGNydFBhdGgpKSB7XHJcbiAgICB0aHJvdyBuZXcgVGxzQ29uZmlndXJhdGlvbkVycm9yKCdNdXN0IHByb3ZpZGUgYm90aCBrZXlwYXRoIGFuZCBjcnRwYXRoIHdoZW4gcnVubmluZyBpbiBUTFMgbW9kZSEnKTtcclxuICB9XHJcblxyXG4gIGlmICgoY3VzdG9tUm9vdFVyaSB8fCBjdXN0b21CaXRjb2luTmV0d29yaykgJiYgZW52ICE9PSAnY3VzdG9tJykge1xyXG4gICAgY29uc29sZS53YXJuKGBjdXN0b21Sb290VXJpIG9yIGN1c3RvbUJpdGNvaW5OZXR3b3JrIGlzIHNldCwgYnV0IGVudiBpcyAnJHtlbnZ9Jy4gU2V0dGluZyBlbnYgdG8gJ2N1c3RvbScuYCk7XHJcbiAgICBjb25maWcuZW52ID0gJ2N1c3RvbSc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwKGNmZzogQ29uZmlnKTogZXhwcmVzcy5BcHBsaWNhdGlvbiB7XHJcbiAgZGVidWcoJ2FwcCBpcyBpbml0aWFsaXppbmcnKTtcclxuXHJcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuICBzZXR1cExvZ2dpbmcoYXBwLCBjZmcpO1xyXG5cclxuICBjb25zdCB7IGRlYnVnTmFtZXNwYWNlLCBkaXNhYmxlUHJveHkgfSA9IGNmZztcclxuXHJcbiAgLy8gZW5hYmxlIHNwZWNpZmllZCBkZWJ1ZyBuYW1lc3BhY2VzXHJcbiAgaWYgKF8uaXNBcnJheShkZWJ1Z05hbWVzcGFjZSkpIHtcclxuICAgIF8uZm9yRWFjaChkZWJ1Z05hbWVzcGFjZSwgbnMgPT4gZGVidWdMaWIuZW5hYmxlKG5zKSk7XHJcbiAgfVxyXG5cclxuICBjaGVja1ByZWNvbmRpdGlvbnMoY2ZnKTtcclxuXHJcbiAgLy8gQmUgbW9yZSByb2J1c3QgYWJvdXQgYWNjZXB0aW5nIFVSTHMgd2l0aCBkb3VibGUgc2xhc2hlc1xyXG4gIGFwcC51c2UoZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICAgIHJlcS51cmwgPSByZXEudXJsLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpO1xyXG4gICAgbmV4dCgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBEZWNvcmF0ZSB0aGUgY2xpZW50IHJvdXRlc1xyXG4gIHNldHVwUm91dGVzKGFwcCwgY2ZnKTtcclxuXHJcbiAgY29uZmlndXJlRW52aXJvbm1lbnQoY2ZnKTtcclxuXHJcbiAgaWYgKCFkaXNhYmxlUHJveHkpIHtcclxuICAgIGNvbmZpZ3VyZVByb3h5KGFwcCwgY2ZnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhcHA7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0KCk6IEJsdWViaXJkPHZvaWQ+IHtcclxuICBjb25zdCBjZmcgPSBjb25maWcoKTtcclxuICBjb25zdCBleHByZXNzQXBwID0gYXBwKGNmZyk7XHJcblxyXG4gIGNvbnN0IHNlcnZlciA9IGF3YWl0IGNyZWF0ZVNlcnZlcihjZmcsIGV4cHJlc3NBcHApO1xyXG5cclxuICBjb25zdCB7IHBvcnQsIGJpbmQgfSA9IGNmZztcclxuICBjb25zdCBiYXNlVXJpID0gY3JlYXRlQmFzZVVyaShjZmcpO1xyXG5cclxuICBzZXJ2ZXIubGlzdGVuKHBvcnQsIGJpbmQsIHN0YXJ0dXAoY2ZnLCBiYXNlVXJpKSk7XHJcbiAgc2VydmVyLnRpbWVvdXQgPSAzMDAgKiAxMDAwOyAvLyA1IG1pbnV0ZXNcclxufVxyXG4iXX0=