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
var bodyParser = require("body-parser");
var bluebird = require("bluebird");
var url = require("url");
var debugLib = require("debug");
var bitgo_1 = require("bitgo");
var _ = require("lodash");
// RequestTracer should be extracted into a separate npm package (along with
// the rest of the BitGoJS HTTP request machinery)
var util_1 = require("bitgo/dist/src/v2/internal/util");
var errors_1 = require("./errors");
var version = require('bitgo/package.json').version;
var pjson = require('../package.json');
var debug = debugLib('bitgo:express');
var BITGOEXPRESS_USER_AGENT = "BitGoExpress/" + pjson.version + " BitGoJS/" + version;
function handlePing(req, res, next) {
    return req.bitgo.ping();
}
function handlePingExpress(req) {
    return {
        status: 'express server is ok!',
    };
}
function handleLogin(req) {
    var username = req.body.username || req.body.email;
    var body = req.body;
    body.username = username;
    return req.bitgo.authenticate(body);
}
function handleDecrypt(req) {
    return {
        decrypted: req.bitgo.decrypt(req.body),
    };
}
function handleEncrypt(req) {
    return {
        encrypted: req.bitgo.encrypt(req.body),
    };
}
/**
 * @deprecated
 * @param req
 */
function handleVerifyAddress(req) {
    return {
        verified: req.bitgo.verifyAddress(req.body),
    };
}
/**
 * @deprecated
 * @param req
 */
function handleCreateLocalKeyChain(req) {
    return req.bitgo.keychains().create(req.body);
}
/**
 * @deprecated
 * @param req
 */
function handleDeriveLocalKeyChain(req) {
    return req.bitgo.keychains().deriveLocal(req.body);
}
/**
 * @deprecated
 * @param req
 */
function handleCreateWalletWithKeychains(req) {
    return req.bitgo.wallets().createWalletWithKeychains(req.body);
}
/**
 * @deprecated
 * @param req
 */
function handleSendCoins(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.sendCoins(req.body);
    })
        .catch(function (err) {
        err.status = 400;
        throw err;
    })
        .then(function (result) {
        if (result.status === 'pendingApproval') {
            throw apiResponse(202, result);
        }
        return result;
    });
}
/**
 * @deprecated
 * @param req
 */
function handleSendMany(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.sendMany(req.body);
    })
        .catch(function (err) {
        err.status = 400;
        throw err;
    })
        .then(function (result) {
        if (result.status === 'pendingApproval') {
            throw apiResponse(202, result);
        }
        return result;
    });
}
/**
 * @deprecated
 * @param req
 */
function handleCreateTransaction(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.createTransaction(req.body);
    })
        .catch(function (err) {
        err.status = 400;
        throw err;
    });
}
/**
 * @deprecated
 * @param req
 */
function handleSignTransaction(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.signTransaction(req.body);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleShareWallet(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.shareWallet(req.body);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleAcceptShare(req) {
    var params = req.body || {};
    params.walletShareId = req.params.shareId;
    return req.bitgo.wallets().acceptShare(params);
}
/**
 * @deprecated
 * @param req
 */
function handleApproveTransaction(req) {
    var params = req.body || {};
    return req.bitgo
        .pendingApprovals()
        .get({ id: req.params.id })
        .then(function (pendingApproval) {
        if (params.state === 'approved') {
            return pendingApproval.approve(params);
        }
        return pendingApproval.reject(params);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleConstructApprovalTx(req) {
    var params = req.body || {};
    return req.bitgo
        .pendingApprovals()
        .get({ id: req.params.id })
        .then(function (pendingApproval) {
        return pendingApproval.constructApprovalTx(params);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleConsolidateUnspents(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.consolidateUnspents(req.body);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleFanOutUnspents(req) {
    return req.bitgo
        .wallets()
        .get({ id: req.params.id })
        .then(function (wallet) {
        return wallet.fanOutUnspents(req.body);
    });
}
/**
 * @deprecated
 * @param req
 */
function handleCalculateMinerFeeInfo(req) {
    return req.bitgo.calculateMinerFeeInfo({
        bitgo: req.bitgo,
        feeRate: req.body.feeRate,
        nP2shInputs: req.body.nP2shInputs,
        nP2pkhInputs: req.body.nP2pkhInputs,
        nP2shP2wshInputs: req.body.nP2shP2wshInputs,
        nOutputs: req.body.nOutputs,
    });
}
/**
 * Builds the API's URL string, optionally building the querystring if parameters exist
 * @param req
 * @return {string}
 */
function createAPIPath(req) {
    var apiPath = '/' + req.params[0];
    if (!_.isEmpty(req.query)) {
        // req.params does not contain the querystring, so we manually add them here
        var urlDetails = url.parse(req.url);
        if (urlDetails.search) {
            // "search" is the properly URL encoded query params, prefixed with "?"
            apiPath += urlDetails.search;
        }
    }
    return apiPath;
}
/**
 * handle any other V1 API call
 * @deprecated
 * @param req
 * @param res
 * @param next
 */
function handleREST(req, res, next) {
    var method = req.method;
    var bitgo = req.bitgo;
    var bitgoURL = bitgo.url(createAPIPath(req));
    return redirectRequest(bitgo, method, bitgoURL, req, next);
}
/**
 * handle any other V2 API call
 * @param req
 * @param res
 * @param next
 */
function handleV2UserREST(req, res, next) {
    var method = req.method;
    var bitgo = req.bitgo;
    var bitgoURL = bitgo.url('/user' + createAPIPath(req), 2);
    return redirectRequest(bitgo, method, bitgoURL, req, next);
}
/**
 * handle v2 address validation
 * @param req
 */
function handleV2VerifyAddress(req) {
    if (!_.isString(req.body.address)) {
        throw new Error('Expected address to be a string');
    }
    if (req.body.supportOldScriptHashVersion !== undefined && !_.isBoolean(req.body.supportOldScriptHashVersion)) {
        throw new Error('Expected supportOldScriptHashVersion to be a boolean.');
    }
    var bitgo = req.bitgo;
    var coin = bitgo.coin(req.params.coin);
    if (coin instanceof bitgo_1.Coin.AbstractUtxoCoin) {
        return {
            isValid: coin.isValidAddress(req.body.address, !!req.body.supportOldScriptHashVersion),
        };
    }
    return {
        isValid: coin.isValidAddress(req.body.address),
    };
}
/**
 * handle address canonicalization
 * @param req
 */
function handleCanonicalAddress(req) {
    var bitgo = req.bitgo;
    var coin = bitgo.coin(req.params.coin);
    if (!['ltc', 'bch', 'bsv'].includes(coin.getFamily())) {
        throw new Error('only Litecoin/Bitcoin Cash/Bitcoin SV address canonicalization is supported');
    }
    var address = req.body.address;
    var fallbackVersion = req.body.scriptHashVersion; // deprecate
    var version = req.body.version;
    return coin.canonicalAddress(address, version || fallbackVersion);
}
/**
 * handle new wallet creation
 * @param req
 */
function handleV2GenerateWallet(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().generateWallet(req.body)];
                case 1:
                    result = _a.sent();
                    // @ts-ignore
                    return [2 /*return*/, result.wallet._wallet];
            }
        });
    });
}
/**
 * handle v2 approve transaction
 * @param req
 */
function handleV2PendingApproval(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, params, pendingApproval;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    params = req.body || {};
                    return [4 /*yield*/, coin.pendingApprovals().get({ id: req.params.id })];
                case 1:
                    pendingApproval = _a.sent();
                    if (params.state === 'approved') {
                        return [2 /*return*/, pendingApproval.approve(params)];
                    }
                    return [2 /*return*/, pendingApproval.reject(params)];
            }
        });
    });
}
/**
 * create a keychain
 * @param req
 */
function handleV2CreateLocalKeyChain(req) {
    var bitgo = req.bitgo;
    var coin = bitgo.coin(req.params.coin);
    return coin.keychains().create(req.body);
}
/**
 * handle wallet share
 * @param req
 */
function handleV2ShareWallet(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.shareWallet(req.body)];
            }
        });
    });
}
/**
 * handle accept wallet share
 * @param req
 */
function handleV2AcceptWalletShare(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, params;
        return __generator(this, function (_a) {
            bitgo = req.bitgo;
            coin = bitgo.coin(req.params.coin);
            params = _.extend({}, req.body, { walletShareId: req.params.id });
            return [2 /*return*/, coin.wallets().acceptShare(params)];
        });
    });
}
/**
 * handle wallet sign transaction
 */
function handleV2SignTxWallet(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.signTransaction(req.body)];
            }
        });
    });
}
/**
 * handle sign transaction
 * @param req
 */
function handleV2SignTx(req) {
    var bitgo = req.bitgo;
    var coin = bitgo.coin(req.params.coin);
    return coin.signTransaction(req.body);
}
/**
 * handle wallet recover token
 * @param req
 */
function handleV2RecoverToken(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.recoverToken(req.body)];
            }
        });
    });
}
/**
 * handle wallet fanout unspents
 * @param req
 */
function handleV2ConsolidateUnspents(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.consolidateUnspents(req.body)];
            }
        });
    });
}
/**
 * handle wallet fanout unspents
 * @param req
 */
function handleV2FanOutUnspents(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.fanoutUnspents(req.body)];
            }
        });
    });
}
/**
 * handle wallet sweep
 * @param req
 */
function handleV2Sweep(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.sweep(req.body)];
            }
        });
    });
}
/**
 * handle CPFP accelerate transaction creation
 * @param req
 */
function handleV2AccelerateTransaction(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, wallet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id })];
                case 1:
                    wallet = _a.sent();
                    return [2 /*return*/, wallet.accelerateTransaction(req.body)];
            }
        });
    });
}
/**
 * handle send one
 * @param req
 */
function handleV2SendOne(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, reqId, wallet, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    reqId = new util_1.RequestTracer();
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id, reqId: reqId })];
                case 1:
                    wallet = _a.sent();
                    req.body.reqId = reqId;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, wallet.send(req.body)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    err_1.status = 400;
                    throw err_1;
                case 5:
                    if (result.status === 'pendingApproval') {
                        throw apiResponse(202, result);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * handle send many
 * @param req
 */
function handleV2SendMany(req) {
    return __awaiter(this, void 0, void 0, function () {
        var bitgo, coin, reqId, wallet, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bitgo = req.bitgo;
                    coin = bitgo.coin(req.params.coin);
                    reqId = new util_1.RequestTracer();
                    return [4 /*yield*/, coin.wallets().get({ id: req.params.id, reqId: reqId })];
                case 1:
                    wallet = _a.sent();
                    req.body.reqId = reqId;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, wallet.sendMany(req.body)];
                case 3:
                    result = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    err_2.status = 400;
                    throw err_2;
                case 5:
                    if (result.status === 'pendingApproval') {
                        throw apiResponse(202, result);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * handle any other API call
 * @param req
 * @param res
 * @param next
 */
function handleV2CoinSpecificREST(req, res, next) {
    var method = req.method;
    var bitgo = req.bitgo;
    try {
        var coin = bitgo.coin(req.params.coin);
        var coinURL = coin.url(createAPIPath(req));
        return redirectRequest(bitgo, method, coinURL, req, next);
    }
    catch (e) {
        if (e instanceof bitgo_1.Errors.UnsupportedCoinError) {
            var queryParams = _.transform(req.query, function (acc, value, key) {
                for (var _i = 0, _a = _.castArray(value); _i < _a.length; _i++) {
                    var val = _a[_i];
                    acc.push(key + "=" + val);
                }
            }, []);
            var baseUrl = bitgo.url(req.baseUrl.replace(/^\/api\/v2/, ''), 2);
            var url_1 = _.isEmpty(queryParams) ? baseUrl : baseUrl + "?" + queryParams.join('&');
            debug("coin " + req.params.coin + " not supported, attempting to handle as a coinless route with url " + url_1);
            return redirectRequest(bitgo, method, url_1, req, next);
        }
        throw e;
    }
}
/**
 * Redirect a request using the bitgo request functions
 * @param bitgo
 * @param method
 * @param url
 * @param req
 * @param next
 */
function redirectRequest(bitgo, method, url, req, next) {
    switch (method) {
        case 'GET':
            return bitgo
                .get(url)
                .result()
                .nodeify();
        case 'POST':
            return bitgo
                .post(url)
                .send(req.body)
                .result()
                .nodeify();
        case 'PUT':
            return bitgo
                .put(url)
                .send(req.body)
                .result()
                .nodeify();
        case 'DELETE':
            return bitgo
                .del(url)
                .send(req.body)
                .result()
                .nodeify();
    }
    // something has presumably gone wrong
    next();
}
/**
 *
 * @param status
 * @param result
 * @param message
 */
function apiResponse(status, result, message) {
    return new errors_1.ApiResponseError(message, status, result);
}
var expressJSONParser = bodyParser.json({ limit: '20mb' });
/**
 * Perform body parsing here only on routes we want
 */
function parseBody(req, res, next) {
    // Set the default Content-Type, in case the client doesn't set it.  If
    // Content-Type isn't specified, Express silently refuses to parse the
    // request body.
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    return expressJSONParser(req, res, next);
}
/**
 * Create the bitgo object in the request
 * @param config
 */
function prepareBitGo(config) {
    var env = config.env, customRootUri = config.customRootUri, customBitcoinNetwork = config.customBitcoinNetwork;
    return function (req, res, next) {
        // Get access token
        var accessToken;
        if (req.headers.authorization) {
            var authSplit = req.headers.authorization.split(' ');
            if (authSplit.length === 2 && authSplit[0].toLowerCase() === 'bearer') {
                accessToken = authSplit[1];
            }
        }
        var userAgent = req.headers['user-agent']
            ? BITGOEXPRESS_USER_AGENT + ' ' + req.headers['user-agent']
            : BITGOEXPRESS_USER_AGENT;
        var bitgoConstructorParams = {
            env: env,
            customRootURI: customRootUri,
            customBitcoinNetwork: customBitcoinNetwork,
            accessToken: accessToken,
            userAgent: userAgent,
        };
        req.bitgo = new bitgo_1.BitGo(bitgoConstructorParams);
        req.bitgo._promise.longStackSupport = true;
        next();
    };
}
/**
 * Promise handler wrapper to handle sending responses and error cases
 * @param promiseRequestHandler
 */
function promiseWrapper(promiseRequestHandler) {
    return function (req, res, next) {
        debug("handle: " + req.method + " " + req.originalUrl);
        bluebird
            .try(promiseRequestHandler.bind(null, req, res, next))
            .then(function (result) {
            var status = 200;
            if (result.__redirect) {
                res.redirect(result.url);
                status = 302;
            }
            else if (result.__render) {
                res.render(result.template, result.params);
            }
            else {
                res.status(status).send(result);
            }
        })
            .catch(function (caught) {
            var err;
            if (caught instanceof Error) {
                err = caught;
            }
            else if (typeof caught === 'string') {
                err = new Error('(string_error) ' + caught);
            }
            else {
                err = new Error('(object_error) ' + JSON.stringify(caught));
            }
            var message = err.message || 'local error';
            // use attached result, or make one
            var result = err.result || { error: message };
            result = _.extend({}, result);
            result.message = err.message;
            var status = err.status || 500;
            if (!(status >= 200 && status < 300)) {
                console.log('error %s: %s', status, err.message);
            }
            if (status === 500) {
                console.log(err.stack);
            }
            res.status(status).send(result);
        })
            .done();
    };
}
function setupRoutes(app, config) {
    // When adding new routes to BitGo Express make sure that you also add the exact same routes to the server. Since
    // some customers were confused when calling a BitGo Express route on the BitGo server, we now handle all BitGo
    // Express routes on the BitGo server and return an error message that says that one should call BitGo Express
    // instead.
    // V1 routes should be added to www/config/routes.js
    // V2 routes should be added to www/config/routesV2.js
    // ping
    // /api/v[12]/pingexpress is the only exception to the rule above, as it explicitly checks the health of the
    // express server without running into rate limiting with the BitGo server.
    app.get('/api/v[12]/ping', prepareBitGo(config), promiseWrapper(handlePing));
    app.get('/api/v[12]/pingexpress', promiseWrapper(handlePingExpress));
    // auth
    app.post('/api/v[12]/user/login', parseBody, prepareBitGo(config), promiseWrapper(handleLogin));
    app.post('/api/v[12]/decrypt', parseBody, prepareBitGo(config), promiseWrapper(handleDecrypt));
    app.post('/api/v[12]/encrypt', parseBody, prepareBitGo(config), promiseWrapper(handleEncrypt));
    app.post('/api/v[12]/verifyaddress', parseBody, prepareBitGo(config), promiseWrapper(handleVerifyAddress));
    app.post('/api/v[12]/calculateminerfeeinfo', parseBody, prepareBitGo(config), promiseWrapper(handleCalculateMinerFeeInfo));
    app.post('/api/v1/keychain/local', parseBody, prepareBitGo(config), promiseWrapper(handleCreateLocalKeyChain));
    app.post('/api/v1/keychain/derive', parseBody, prepareBitGo(config), promiseWrapper(handleDeriveLocalKeyChain));
    app.post('/api/v1/wallets/simplecreate', parseBody, prepareBitGo(config), promiseWrapper(handleCreateWalletWithKeychains));
    app.post('/api/v1/wallet/:id/sendcoins', parseBody, prepareBitGo(config), promiseWrapper(handleSendCoins));
    app.post('/api/v1/wallet/:id/sendmany', parseBody, prepareBitGo(config), promiseWrapper(handleSendMany));
    app.post('/api/v1/wallet/:id/createtransaction', parseBody, prepareBitGo(config), promiseWrapper(handleCreateTransaction));
    app.post('/api/v1/wallet/:id/signtransaction', parseBody, prepareBitGo(config), promiseWrapper(handleSignTransaction));
    app.post('/api/v1/wallet/:id/simpleshare', parseBody, prepareBitGo(config), promiseWrapper(handleShareWallet));
    app.post('/api/v1/walletshare/:shareId/acceptShare', parseBody, prepareBitGo(config), promiseWrapper(handleAcceptShare));
    app.put('/api/v1/pendingapprovals/:id/express', parseBody, prepareBitGo(config), promiseWrapper(handleApproveTransaction));
    app.put('/api/v1/pendingapprovals/:id/constructTx', parseBody, prepareBitGo(config), promiseWrapper(handleConstructApprovalTx));
    app.put('/api/v1/wallet/:id/consolidateunspents', parseBody, prepareBitGo(config), promiseWrapper(handleConsolidateUnspents));
    app.put('/api/v1/wallet/:id/fanoutunspents', parseBody, prepareBitGo(config), promiseWrapper(handleFanOutUnspents));
    // any other API call
    app.use('/api/v[1]/*', parseBody, prepareBitGo(config), promiseWrapper(handleREST));
    // API v2
    // create keychain
    app.post('/api/v2/:coin/keychain/local', parseBody, prepareBitGo(config), promiseWrapper(handleV2CreateLocalKeyChain));
    // generate wallet
    app.post('/api/v2/:coin/wallet/generate', parseBody, prepareBitGo(config), promiseWrapper(handleV2GenerateWallet));
    // share wallet
    app.post('/api/v2/:coin/wallet/:id/share', parseBody, prepareBitGo(config), promiseWrapper(handleV2ShareWallet));
    app.post('/api/v2/:coin/walletshare/:id/acceptshare', parseBody, prepareBitGo(config), promiseWrapper(handleV2AcceptWalletShare));
    // sign transaction
    app.post('/api/v2/:coin/signtx', parseBody, prepareBitGo(config), promiseWrapper(handleV2SignTx));
    app.post('/api/v2/:coin/wallet/:id/signtx', parseBody, prepareBitGo(config), promiseWrapper(handleV2SignTxWallet));
    app.post('/api/v2/:coin/wallet/:id/recovertoken', parseBody, prepareBitGo(config), promiseWrapper(handleV2RecoverToken));
    // send transaction
    app.post('/api/v2/:coin/wallet/:id/sendcoins', parseBody, prepareBitGo(config), promiseWrapper(handleV2SendOne));
    app.post('/api/v2/:coin/wallet/:id/sendmany', parseBody, prepareBitGo(config), promiseWrapper(handleV2SendMany));
    // unspent changes
    app.post('/api/v2/:coin/wallet/:id/consolidateunspents', parseBody, prepareBitGo(config), promiseWrapper(handleV2ConsolidateUnspents));
    app.post('/api/v2/:coin/wallet/:id/fanoutunspents', parseBody, prepareBitGo(config), promiseWrapper(handleV2FanOutUnspents));
    app.post('/api/v2/:coin/wallet/:id/sweep', parseBody, prepareBitGo(config), promiseWrapper(handleV2Sweep));
    // CPFP
    app.post('/api/v2/:coin/wallet/:id/acceleratetx', parseBody, prepareBitGo(config), promiseWrapper(handleV2AccelerateTransaction));
    // Miscellaneous
    app.post('/api/v2/:coin/canonicaladdress', parseBody, prepareBitGo(config), promiseWrapper(handleCanonicalAddress));
    app.post('/api/v2/:coin/verifyaddress', parseBody, prepareBitGo(config), promiseWrapper(handleV2VerifyAddress));
    app.put('/api/v2/:coin/pendingapprovals/:id', parseBody, prepareBitGo(config), promiseWrapper(handleV2PendingApproval));
    // any other API v2 call
    app.use('/api/v2/user/*', parseBody, prepareBitGo(config), promiseWrapper(handleV2UserREST));
    app.use('/api/v2/:coin/*', parseBody, prepareBitGo(config), promiseWrapper(handleV2CoinSpecificREST));
}
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50Um91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudFJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCx3Q0FBMEM7QUFDMUMsbUNBQXFDO0FBQ3JDLHlCQUEyQjtBQUMzQixnQ0FBa0M7QUFDbEMsK0JBQTRDO0FBQzVDLDBCQUE0QjtBQUc1Qiw0RUFBNEU7QUFDNUUsa0RBQWtEO0FBQ2xELHdEQUFnRTtBQUdoRSxtQ0FBNEM7QUFFcEMsSUFBQSwrQ0FBTyxDQUFtQztBQUNsRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN6QyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFeEMsSUFBTSx1QkFBdUIsR0FBRyxrQkFBZ0IsS0FBSyxDQUFDLE9BQU8saUJBQVksT0FBUyxDQUFDO0FBUW5GLFNBQVMsVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtJQUN6RixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsR0FBb0I7SUFDN0MsT0FBTztRQUNMLE1BQU0sRUFBRSx1QkFBdUI7S0FDaEMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFvQjtJQUN2QyxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyRCxJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7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QUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztJQUNoSCxHQUFHLENBQUMsR0FBRyxDQUNMLG9DQUFvQyxFQUNwQyxTQUFTLEVBQ1QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUNwQixjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FDeEMsQ0FBQztJQUVGLHdCQUF3QjtJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUM3RixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztBQUN4RyxDQUFDO0FBM0pELGtDQTJKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAcHJldHRpZXJcclxuICovXHJcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5pbXBvcnQgKiBhcyBibHVlYmlyZCBmcm9tICdibHVlYmlyZCc7XHJcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xyXG5pbXBvcnQgKiBhcyBkZWJ1Z0xpYiBmcm9tICdkZWJ1Zyc7XHJcbmltcG9ydCB7IEJpdEdvLCBDb2luLCBFcnJvcnMgfSBmcm9tICdiaXRnbyc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuXHJcbi8vIFJlcXVlc3RUcmFjZXIgc2hvdWxkIGJlIGV4dHJhY3RlZCBpbnRvIGEgc2VwYXJhdGUgbnBtIHBhY2thZ2UgKGFsb25nIHdpdGhcclxuLy8gdGhlIHJlc3Qgb2YgdGhlIEJpdEdvSlMgSFRUUCByZXF1ZXN0IG1hY2hpbmVyeSlcclxuaW1wb3J0IHsgUmVxdWVzdFRyYWNlciB9IGZyb20gJ2JpdGdvL2Rpc3Qvc3JjL3YyL2ludGVybmFsL3V0aWwnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgeyBBcGlSZXNwb25zZUVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xyXG5cclxuY29uc3QgeyB2ZXJzaW9uIH0gPSByZXF1aXJlKCdiaXRnby9wYWNrYWdlLmpzb24nKTtcclxuY29uc3QgcGpzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcclxuY29uc3QgZGVidWcgPSBkZWJ1Z0xpYignYml0Z286ZXhwcmVzcycpO1xyXG5cclxuY29uc3QgQklUR09FWFBSRVNTX1VTRVJfQUdFTlQgPSBgQml0R29FeHByZXNzLyR7cGpzb24udmVyc2lvbn0gQml0R29KUy8ke3ZlcnNpb259YDtcclxuXHJcbmRlY2xhcmUgbW9kdWxlICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJyB7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0IHtcclxuICAgIGJpdGdvOiBCaXRHbztcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVBpbmcocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIHtcclxuICByZXR1cm4gcmVxLmJpdGdvLnBpbmcoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlUGluZ0V4cHJlc3MocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICByZXR1cm4ge1xyXG4gICAgc3RhdHVzOiAnZXhwcmVzcyBzZXJ2ZXIgaXMgb2shJyxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVMb2dpbihyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IHVzZXJuYW1lID0gcmVxLmJvZHkudXNlcm5hbWUgfHwgcmVxLmJvZHkuZW1haWw7XHJcbiAgY29uc3QgYm9keSA9IHJlcS5ib2R5O1xyXG4gIGJvZHkudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICByZXR1cm4gcmVxLmJpdGdvLmF1dGhlbnRpY2F0ZShib2R5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRGVjcnlwdChyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBkZWNyeXB0ZWQ6IHJlcS5iaXRnby5kZWNyeXB0KHJlcS5ib2R5KSxcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVFbmNyeXB0KHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVuY3J5cHRlZDogcmVxLmJpdGdvLmVuY3J5cHQocmVxLmJvZHkpLFxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVWZXJpZnlBZGRyZXNzKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHZlcmlmaWVkOiByZXEuYml0Z28udmVyaWZ5QWRkcmVzcyhyZXEuYm9keSksXHJcbiAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZUNyZWF0ZUxvY2FsS2V5Q2hhaW4ocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICByZXR1cm4gcmVxLmJpdGdvLmtleWNoYWlucygpLmNyZWF0ZShyZXEuYm9keSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVEZXJpdmVMb2NhbEtleUNoYWluKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHJlcS5iaXRnby5rZXljaGFpbnMoKS5kZXJpdmVMb2NhbChyZXEuYm9keSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVDcmVhdGVXYWxsZXRXaXRoS2V5Y2hhaW5zKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHJlcS5iaXRnby53YWxsZXRzKCkuY3JlYXRlV2FsbGV0V2l0aEtleWNoYWlucyhyZXEuYm9keSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVTZW5kQ29pbnMocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICByZXR1cm4gcmVxLmJpdGdvXHJcbiAgICAud2FsbGV0cygpXHJcbiAgICAuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKHdhbGxldCkge1xyXG4gICAgICByZXR1cm4gd2FsbGV0LnNlbmRDb2lucyhyZXEuYm9keSk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xyXG4gICAgICBlcnIuc3RhdHVzID0gNDAwO1xyXG4gICAgICB0aHJvdyBlcnI7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAncGVuZGluZ0FwcHJvdmFsJykge1xyXG4gICAgICAgIHRocm93IGFwaVJlc3BvbnNlKDIwMiwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVTZW5kTWFueShyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIHJldHVybiByZXEuYml0Z29cclxuICAgIC53YWxsZXRzKClcclxuICAgIC5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24od2FsbGV0KSB7XHJcbiAgICAgIHJldHVybiB3YWxsZXQuc2VuZE1hbnkocmVxLmJvZHkpO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcclxuICAgICAgZXJyLnN0YXR1cyA9IDQwMDtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3BlbmRpbmdBcHByb3ZhbCcpIHtcclxuICAgICAgICB0aHJvdyBhcGlSZXNwb25zZSgyMDIsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlcHJlY2F0ZWRcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlQ3JlYXRlVHJhbnNhY3Rpb24ocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICByZXR1cm4gcmVxLmJpdGdvXHJcbiAgICAud2FsbGV0cygpXHJcbiAgICAuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKHdhbGxldCkge1xyXG4gICAgICByZXR1cm4gd2FsbGV0LmNyZWF0ZVRyYW5zYWN0aW9uKHJlcS5ib2R5KTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgIGVyci5zdGF0dXMgPSA0MDA7XHJcbiAgICAgIHRocm93IGVycjtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlcHJlY2F0ZWRcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlU2lnblRyYW5zYWN0aW9uKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHJlcS5iaXRnb1xyXG4gICAgLndhbGxldHMoKVxyXG4gICAgLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pXHJcbiAgICAudGhlbihmdW5jdGlvbih3YWxsZXQpIHtcclxuICAgICAgcmV0dXJuIHdhbGxldC5zaWduVHJhbnNhY3Rpb24ocmVxLmJvZHkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVTaGFyZVdhbGxldChyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIHJldHVybiByZXEuYml0Z29cclxuICAgIC53YWxsZXRzKClcclxuICAgIC5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24od2FsbGV0KSB7XHJcbiAgICAgIHJldHVybiB3YWxsZXQuc2hhcmVXYWxsZXQocmVxLmJvZHkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVBY2NlcHRTaGFyZShyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IHBhcmFtcyA9IHJlcS5ib2R5IHx8IHt9O1xyXG4gIHBhcmFtcy53YWxsZXRTaGFyZUlkID0gcmVxLnBhcmFtcy5zaGFyZUlkO1xyXG4gIHJldHVybiByZXEuYml0Z28ud2FsbGV0cygpLmFjY2VwdFNoYXJlKHBhcmFtcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVBcHByb3ZlVHJhbnNhY3Rpb24ocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBwYXJhbXMgPSByZXEuYm9keSB8fCB7fTtcclxuICByZXR1cm4gcmVxLmJpdGdvXHJcbiAgICAucGVuZGluZ0FwcHJvdmFscygpXHJcbiAgICAuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKHBlbmRpbmdBcHByb3ZhbCkge1xyXG4gICAgICBpZiAocGFyYW1zLnN0YXRlID09PSAnYXBwcm92ZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIHBlbmRpbmdBcHByb3ZhbC5hcHByb3ZlKHBhcmFtcyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHBlbmRpbmdBcHByb3ZhbC5yZWplY3QocGFyYW1zKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlcHJlY2F0ZWRcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlQ29uc3RydWN0QXBwcm92YWxUeChyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IHBhcmFtcyA9IHJlcS5ib2R5IHx8IHt9O1xyXG4gIHJldHVybiByZXEuYml0Z29cclxuICAgIC5wZW5kaW5nQXBwcm92YWxzKClcclxuICAgIC5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCB9KVxyXG4gICAgLnRoZW4oZnVuY3Rpb24ocGVuZGluZ0FwcHJvdmFsKSB7XHJcbiAgICAgIHJldHVybiBwZW5kaW5nQXBwcm92YWwuY29uc3RydWN0QXBwcm92YWxUeChwYXJhbXMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVDb25zb2xpZGF0ZVVuc3BlbnRzKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHJlcS5iaXRnb1xyXG4gICAgLndhbGxldHMoKVxyXG4gICAgLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pXHJcbiAgICAudGhlbihmdW5jdGlvbih3YWxsZXQpIHtcclxuICAgICAgcmV0dXJuIHdhbGxldC5jb25zb2xpZGF0ZVVuc3BlbnRzKHJlcS5ib2R5KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlcHJlY2F0ZWRcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlRmFuT3V0VW5zcGVudHMocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICByZXR1cm4gcmVxLmJpdGdvXHJcbiAgICAud2FsbGV0cygpXHJcbiAgICAuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSlcclxuICAgIC50aGVuKGZ1bmN0aW9uKHdhbGxldCkge1xyXG4gICAgICByZXR1cm4gd2FsbGV0LmZhbk91dFVuc3BlbnRzKHJlcS5ib2R5KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGRlcHJlY2F0ZWRcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlQ2FsY3VsYXRlTWluZXJGZWVJbmZvKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgcmV0dXJuIHJlcS5iaXRnby5jYWxjdWxhdGVNaW5lckZlZUluZm8oe1xyXG4gICAgYml0Z286IHJlcS5iaXRnbyxcclxuICAgIGZlZVJhdGU6IHJlcS5ib2R5LmZlZVJhdGUsXHJcbiAgICBuUDJzaElucHV0czogcmVxLmJvZHkublAyc2hJbnB1dHMsXHJcbiAgICBuUDJwa2hJbnB1dHM6IHJlcS5ib2R5Lm5QMnBraElucHV0cyxcclxuICAgIG5QMnNoUDJ3c2hJbnB1dHM6IHJlcS5ib2R5Lm5QMnNoUDJ3c2hJbnB1dHMsXHJcbiAgICBuT3V0cHV0czogcmVxLmJvZHkubk91dHB1dHMsXHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCdWlsZHMgdGhlIEFQSSdzIFVSTCBzdHJpbmcsIG9wdGlvbmFsbHkgYnVpbGRpbmcgdGhlIHF1ZXJ5c3RyaW5nIGlmIHBhcmFtZXRlcnMgZXhpc3RcclxuICogQHBhcmFtIHJlcVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVBUElQYXRoKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgbGV0IGFwaVBhdGggPSAnLycgKyByZXEucGFyYW1zWzBdO1xyXG4gIGlmICghXy5pc0VtcHR5KHJlcS5xdWVyeSkpIHtcclxuICAgIC8vIHJlcS5wYXJhbXMgZG9lcyBub3QgY29udGFpbiB0aGUgcXVlcnlzdHJpbmcsIHNvIHdlIG1hbnVhbGx5IGFkZCB0aGVtIGhlcmVcclxuICAgIGNvbnN0IHVybERldGFpbHMgPSB1cmwucGFyc2UocmVxLnVybCk7XHJcbiAgICBpZiAodXJsRGV0YWlscy5zZWFyY2gpIHtcclxuICAgICAgLy8gXCJzZWFyY2hcIiBpcyB0aGUgcHJvcGVybHkgVVJMIGVuY29kZWQgcXVlcnkgcGFyYW1zLCBwcmVmaXhlZCB3aXRoIFwiP1wiXHJcbiAgICAgIGFwaVBhdGggKz0gdXJsRGV0YWlscy5zZWFyY2g7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBhcGlQYXRoO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIGFueSBvdGhlciBWMSBBUEkgY2FsbFxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqIEBwYXJhbSByZXNcclxuICogQHBhcmFtIG5leHRcclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZVJFU1QocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIHtcclxuICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kO1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGJpdGdvVVJMID0gYml0Z28udXJsKGNyZWF0ZUFQSVBhdGgocmVxKSk7XHJcbiAgcmV0dXJuIHJlZGlyZWN0UmVxdWVzdChiaXRnbywgbWV0aG9kLCBiaXRnb1VSTCwgcmVxLCBuZXh0KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSBhbnkgb3RoZXIgVjIgQVBJIGNhbGxcclxuICogQHBhcmFtIHJlcVxyXG4gKiBAcGFyYW0gcmVzXHJcbiAqIEBwYXJhbSBuZXh0XHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVWMlVzZXJSRVNUKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZDtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBiaXRnb1VSTCA9IGJpdGdvLnVybCgnL3VzZXInICsgY3JlYXRlQVBJUGF0aChyZXEpLCAyKTtcclxuICByZXR1cm4gcmVkaXJlY3RSZXF1ZXN0KGJpdGdvLCBtZXRob2QsIGJpdGdvVVJMLCByZXEsIG5leHQpO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIHYyIGFkZHJlc3MgdmFsaWRhdGlvblxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVWMlZlcmlmeUFkZHJlc3MocmVxOiBleHByZXNzLlJlcXVlc3QpOiB7IGlzVmFsaWQ6IGJvb2xlYW4gfSB7XHJcbiAgaWYgKCFfLmlzU3RyaW5nKHJlcS5ib2R5LmFkZHJlc3MpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGFkZHJlc3MgdG8gYmUgYSBzdHJpbmcnKTtcclxuICB9XHJcblxyXG4gIGlmIChyZXEuYm9keS5zdXBwb3J0T2xkU2NyaXB0SGFzaFZlcnNpb24gIT09IHVuZGVmaW5lZCAmJiAhXy5pc0Jvb2xlYW4ocmVxLmJvZHkuc3VwcG9ydE9sZFNjcmlwdEhhc2hWZXJzaW9uKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBzdXBwb3J0T2xkU2NyaXB0SGFzaFZlcnNpb24gdG8gYmUgYSBib29sZWFuLicpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYml0Z28gPSByZXEuYml0Z287XHJcbiAgY29uc3QgY29pbiA9IGJpdGdvLmNvaW4ocmVxLnBhcmFtcy5jb2luKTtcclxuXHJcbiAgaWYgKGNvaW4gaW5zdGFuY2VvZiBDb2luLkFic3RyYWN0VXR4b0NvaW4pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlzVmFsaWQ6IGNvaW4uaXNWYWxpZEFkZHJlc3MocmVxLmJvZHkuYWRkcmVzcywgISFyZXEuYm9keS5zdXBwb3J0T2xkU2NyaXB0SGFzaFZlcnNpb24pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpc1ZhbGlkOiBjb2luLmlzVmFsaWRBZGRyZXNzKHJlcS5ib2R5LmFkZHJlc3MpLFxyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgYWRkcmVzcyBjYW5vbmljYWxpemF0aW9uXHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZUNhbm9uaWNhbEFkZHJlc3MocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGlmICghWydsdGMnLCAnYmNoJywgJ2JzdiddLmluY2x1ZGVzKGNvaW4uZ2V0RmFtaWx5KCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgTGl0ZWNvaW4vQml0Y29pbiBDYXNoL0JpdGNvaW4gU1YgYWRkcmVzcyBjYW5vbmljYWxpemF0aW9uIGlzIHN1cHBvcnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWRkcmVzcyA9IHJlcS5ib2R5LmFkZHJlc3M7XHJcbiAgY29uc3QgZmFsbGJhY2tWZXJzaW9uID0gcmVxLmJvZHkuc2NyaXB0SGFzaFZlcnNpb247IC8vIGRlcHJlY2F0ZVxyXG4gIGNvbnN0IHZlcnNpb24gPSByZXEuYm9keS52ZXJzaW9uO1xyXG4gIHJldHVybiAoY29pbiBhcyBDb2luLkJjaCB8IENvaW4uQnN2IHwgQ29pbi5MdGMpLmNhbm9uaWNhbEFkZHJlc3MoYWRkcmVzcywgdmVyc2lvbiB8fCBmYWxsYmFja1ZlcnNpb24pO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIG5ldyB3YWxsZXQgY3JlYXRpb25cclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVjJHZW5lcmF0ZVdhbGxldChyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY29pbi53YWxsZXRzKCkuZ2VuZXJhdGVXYWxsZXQocmVxLmJvZHkpO1xyXG4gIC8vIEB0cy1pZ25vcmVcclxuICByZXR1cm4gcmVzdWx0LndhbGxldC5fd2FsbGV0O1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIHYyIGFwcHJvdmUgdHJhbnNhY3Rpb25cclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVjJQZW5kaW5nQXBwcm92YWwocmVxOiBleHByZXNzLlJlcXVlc3QpOiBQcm9taXNlPGFueT4ge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgY29uc3QgcGFyYW1zID0gcmVxLmJvZHkgfHwge307XHJcbiAgY29uc3QgcGVuZGluZ0FwcHJvdmFsID0gYXdhaXQgY29pbi5wZW5kaW5nQXBwcm92YWxzKCkuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSk7XHJcbiAgaWYgKHBhcmFtcy5zdGF0ZSA9PT0gJ2FwcHJvdmVkJykge1xyXG4gICAgcmV0dXJuIHBlbmRpbmdBcHByb3ZhbC5hcHByb3ZlKHBhcmFtcyk7XHJcbiAgfVxyXG4gIHJldHVybiBwZW5kaW5nQXBwcm92YWwucmVqZWN0KHBhcmFtcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjcmVhdGUgYSBrZXljaGFpblxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVWMkNyZWF0ZUxvY2FsS2V5Q2hhaW4ocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIHJldHVybiBjb2luLmtleWNoYWlucygpLmNyZWF0ZShyZXEuYm9keSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgd2FsbGV0IHNoYXJlXHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVYyU2hhcmVXYWxsZXQocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGNvbnN0IHdhbGxldCA9IGF3YWl0IGNvaW4ud2FsbGV0cygpLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pO1xyXG4gIHJldHVybiB3YWxsZXQuc2hhcmVXYWxsZXQocmVxLmJvZHkpO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIGFjY2VwdCB3YWxsZXQgc2hhcmVcclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVjJBY2NlcHRXYWxsZXRTaGFyZShyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgY29uc3QgcGFyYW1zID0gXy5leHRlbmQoe30sIHJlcS5ib2R5LCB7IHdhbGxldFNoYXJlSWQ6IHJlcS5wYXJhbXMuaWQgfSk7XHJcbiAgcmV0dXJuIGNvaW4ud2FsbGV0cygpLmFjY2VwdFNoYXJlKHBhcmFtcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgd2FsbGV0IHNpZ24gdHJhbnNhY3Rpb25cclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVYyU2lnblR4V2FsbGV0KHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgY29uc3QgYml0Z28gPSByZXEuYml0Z287XHJcbiAgY29uc3QgY29pbiA9IGJpdGdvLmNvaW4ocmVxLnBhcmFtcy5jb2luKTtcclxuICBjb25zdCB3YWxsZXQgPSBhd2FpdCBjb2luLndhbGxldHMoKS5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCB9KTtcclxuICByZXR1cm4gd2FsbGV0LnNpZ25UcmFuc2FjdGlvbihyZXEuYm9keSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgc2lnbiB0cmFuc2FjdGlvblxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVWMlNpZ25UeChyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgcmV0dXJuIGNvaW4uc2lnblRyYW5zYWN0aW9uKHJlcS5ib2R5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSB3YWxsZXQgcmVjb3ZlciB0b2tlblxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVWMlJlY292ZXJUb2tlbihyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcblxyXG4gIGNvbnN0IHdhbGxldCA9IGF3YWl0IGNvaW4ud2FsbGV0cygpLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pO1xyXG4gIHJldHVybiB3YWxsZXQucmVjb3ZlclRva2VuKHJlcS5ib2R5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSB3YWxsZXQgZmFub3V0IHVuc3BlbnRzXHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVYyQ29uc29saWRhdGVVbnNwZW50cyhyZXE6IGV4cHJlc3MuUmVxdWVzdCkge1xyXG4gIGNvbnN0IGJpdGdvID0gcmVxLmJpdGdvO1xyXG4gIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgY29uc3Qgd2FsbGV0ID0gYXdhaXQgY29pbi53YWxsZXRzKCkuZ2V0KHsgaWQ6IHJlcS5wYXJhbXMuaWQgfSk7XHJcbiAgcmV0dXJuIHdhbGxldC5jb25zb2xpZGF0ZVVuc3BlbnRzKHJlcS5ib2R5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSB3YWxsZXQgZmFub3V0IHVuc3BlbnRzXHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVYyRmFuT3V0VW5zcGVudHMocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGNvbnN0IHdhbGxldCA9IGF3YWl0IGNvaW4ud2FsbGV0cygpLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pO1xyXG4gIHJldHVybiB3YWxsZXQuZmFub3V0VW5zcGVudHMocmVxLmJvZHkpO1xyXG59XHJcblxyXG4vKipcclxuICogaGFuZGxlIHdhbGxldCBzd2VlcFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVWMlN3ZWVwKHJlcTogZXhwcmVzcy5SZXF1ZXN0KSB7XHJcbiAgY29uc3QgYml0Z28gPSByZXEuYml0Z287XHJcbiAgY29uc3QgY29pbiA9IGJpdGdvLmNvaW4ocmVxLnBhcmFtcy5jb2luKTtcclxuICBjb25zdCB3YWxsZXQgPSBhd2FpdCBjb2luLndhbGxldHMoKS5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCB9KTtcclxuICByZXR1cm4gd2FsbGV0LnN3ZWVwKHJlcS5ib2R5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSBDUEZQIGFjY2VsZXJhdGUgdHJhbnNhY3Rpb24gY3JlYXRpb25cclxuICogQHBhcmFtIHJlcVxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlVjJBY2NlbGVyYXRlVHJhbnNhY3Rpb24ocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGNvbnN0IHdhbGxldCA9IGF3YWl0IGNvaW4ud2FsbGV0cygpLmdldCh7IGlkOiByZXEucGFyYW1zLmlkIH0pO1xyXG4gIHJldHVybiB3YWxsZXQuYWNjZWxlcmF0ZVRyYW5zYWN0aW9uKHJlcS5ib2R5KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGhhbmRsZSBzZW5kIG9uZVxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVWMlNlbmRPbmUocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGNvbnN0IHJlcUlkID0gbmV3IFJlcXVlc3RUcmFjZXIoKTtcclxuICBjb25zdCB3YWxsZXQgPSBhd2FpdCBjb2luLndhbGxldHMoKS5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCwgcmVxSWQgfSk7XHJcbiAgcmVxLmJvZHkucmVxSWQgPSByZXFJZDtcclxuXHJcbiAgbGV0IHJlc3VsdDtcclxuICB0cnkge1xyXG4gICAgcmVzdWx0ID0gYXdhaXQgd2FsbGV0LnNlbmQocmVxLmJvZHkpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgZXJyLnN0YXR1cyA9IDQwMDtcclxuICAgIHRocm93IGVycjtcclxuICB9XHJcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdwZW5kaW5nQXBwcm92YWwnKSB7XHJcbiAgICB0aHJvdyBhcGlSZXNwb25zZSgyMDIsIHJlc3VsdCk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgc2VuZCBtYW55XHJcbiAqIEBwYXJhbSByZXFcclxuICovXHJcbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVYyU2VuZE1hbnkocmVxOiBleHByZXNzLlJlcXVlc3QpIHtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuICBjb25zdCBjb2luID0gYml0Z28uY29pbihyZXEucGFyYW1zLmNvaW4pO1xyXG4gIGNvbnN0IHJlcUlkID0gbmV3IFJlcXVlc3RUcmFjZXIoKTtcclxuICBjb25zdCB3YWxsZXQgPSBhd2FpdCBjb2luLndhbGxldHMoKS5nZXQoeyBpZDogcmVxLnBhcmFtcy5pZCwgcmVxSWQgfSk7XHJcbiAgcmVxLmJvZHkucmVxSWQgPSByZXFJZDtcclxuICBsZXQgcmVzdWx0O1xyXG4gIHRyeSB7XHJcbiAgICByZXN1bHQgPSBhd2FpdCB3YWxsZXQuc2VuZE1hbnkocmVxLmJvZHkpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgZXJyLnN0YXR1cyA9IDQwMDtcclxuICAgIHRocm93IGVycjtcclxuICB9XHJcbiAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdwZW5kaW5nQXBwcm92YWwnKSB7XHJcbiAgICB0aHJvdyBhcGlSZXNwb25zZSgyMDIsIHJlc3VsdCk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBoYW5kbGUgYW55IG90aGVyIEFQSSBjYWxsXHJcbiAqIEBwYXJhbSByZXFcclxuICogQHBhcmFtIHJlc1xyXG4gKiBAcGFyYW0gbmV4dFxyXG4gKi9cclxuZnVuY3Rpb24gaGFuZGxlVjJDb2luU3BlY2lmaWNSRVNUKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XHJcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZDtcclxuICBjb25zdCBiaXRnbyA9IHJlcS5iaXRnbztcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNvaW4gPSBiaXRnby5jb2luKHJlcS5wYXJhbXMuY29pbik7XHJcbiAgICBjb25zdCBjb2luVVJMID0gY29pbi51cmwoY3JlYXRlQVBJUGF0aChyZXEpKTtcclxuICAgIHJldHVybiByZWRpcmVjdFJlcXVlc3QoYml0Z28sIG1ldGhvZCwgY29pblVSTCwgcmVxLCBuZXh0KTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9ycy5VbnN1cHBvcnRlZENvaW5FcnJvcikge1xyXG4gICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IF8udHJhbnNmb3JtKFxyXG4gICAgICAgIHJlcS5xdWVyeSxcclxuICAgICAgICAoYWNjOiBzdHJpbmdbXSwgdmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgZm9yIChjb25zdCB2YWwgb2YgXy5jYXN0QXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGFjYy5wdXNoKGAke2tleX09JHt2YWx9YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBbXVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBiYXNlVXJsID0gYml0Z28udXJsKHJlcS5iYXNlVXJsLnJlcGxhY2UoL15cXC9hcGlcXC92Mi8sICcnKSwgMik7XHJcbiAgICAgIGNvbnN0IHVybCA9IF8uaXNFbXB0eShxdWVyeVBhcmFtcykgPyBiYXNlVXJsIDogYCR7YmFzZVVybH0/JHtxdWVyeVBhcmFtcy5qb2luKCcmJyl9YDtcclxuXHJcbiAgICAgIGRlYnVnKGBjb2luICR7cmVxLnBhcmFtcy5jb2lufSBub3Qgc3VwcG9ydGVkLCBhdHRlbXB0aW5nIHRvIGhhbmRsZSBhcyBhIGNvaW5sZXNzIHJvdXRlIHdpdGggdXJsICR7dXJsfWApO1xyXG4gICAgICByZXR1cm4gcmVkaXJlY3RSZXF1ZXN0KGJpdGdvLCBtZXRob2QsIHVybCwgcmVxLCBuZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlZGlyZWN0IGEgcmVxdWVzdCB1c2luZyB0aGUgYml0Z28gcmVxdWVzdCBmdW5jdGlvbnNcclxuICogQHBhcmFtIGJpdGdvXHJcbiAqIEBwYXJhbSBtZXRob2RcclxuICogQHBhcmFtIHVybFxyXG4gKiBAcGFyYW0gcmVxXHJcbiAqIEBwYXJhbSBuZXh0XHJcbiAqL1xyXG5mdW5jdGlvbiByZWRpcmVjdFJlcXVlc3QoYml0Z286IEJpdEdvLCBtZXRob2Q6IHN0cmluZywgdXJsOiBzdHJpbmcsIHJlcTogZXhwcmVzcy5SZXF1ZXN0LCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xyXG4gIHN3aXRjaCAobWV0aG9kKSB7XHJcbiAgICBjYXNlICdHRVQnOlxyXG4gICAgICByZXR1cm4gYml0Z29cclxuICAgICAgICAuZ2V0KHVybClcclxuICAgICAgICAucmVzdWx0KClcclxuICAgICAgICAubm9kZWlmeSgpO1xyXG4gICAgY2FzZSAnUE9TVCc6XHJcbiAgICAgIHJldHVybiBiaXRnb1xyXG4gICAgICAgIC5wb3N0KHVybClcclxuICAgICAgICAuc2VuZChyZXEuYm9keSlcclxuICAgICAgICAucmVzdWx0KClcclxuICAgICAgICAubm9kZWlmeSgpO1xyXG4gICAgY2FzZSAnUFVUJzpcclxuICAgICAgcmV0dXJuIGJpdGdvXHJcbiAgICAgICAgLnB1dCh1cmwpXHJcbiAgICAgICAgLnNlbmQocmVxLmJvZHkpXHJcbiAgICAgICAgLnJlc3VsdCgpXHJcbiAgICAgICAgLm5vZGVpZnkoKTtcclxuICAgIGNhc2UgJ0RFTEVURSc6XHJcbiAgICAgIHJldHVybiBiaXRnb1xyXG4gICAgICAgIC5kZWwodXJsKVxyXG4gICAgICAgIC5zZW5kKHJlcS5ib2R5KVxyXG4gICAgICAgIC5yZXN1bHQoKVxyXG4gICAgICAgIC5ub2RlaWZ5KCk7XHJcbiAgfVxyXG4gIC8vIHNvbWV0aGluZyBoYXMgcHJlc3VtYWJseSBnb25lIHdyb25nXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHN0YXR1c1xyXG4gKiBAcGFyYW0gcmVzdWx0XHJcbiAqIEBwYXJhbSBtZXNzYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBhcGlSZXNwb25zZShzdGF0dXM6IG51bWJlciwgcmVzdWx0OiBhbnksIG1lc3NhZ2U/OiBzdHJpbmcpOiBBcGlSZXNwb25zZUVycm9yIHtcclxuICByZXR1cm4gbmV3IEFwaVJlc3BvbnNlRXJyb3IobWVzc2FnZSwgc3RhdHVzLCByZXN1bHQpO1xyXG59XHJcblxyXG5jb25zdCBleHByZXNzSlNPTlBhcnNlciA9IGJvZHlQYXJzZXIuanNvbih7IGxpbWl0OiAnMjBtYicgfSk7XHJcblxyXG4vKipcclxuICogUGVyZm9ybSBib2R5IHBhcnNpbmcgaGVyZSBvbmx5IG9uIHJvdXRlcyB3ZSB3YW50XHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZUJvZHkocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIHtcclxuICAvLyBTZXQgdGhlIGRlZmF1bHQgQ29udGVudC1UeXBlLCBpbiBjYXNlIHRoZSBjbGllbnQgZG9lc24ndCBzZXQgaXQuICBJZlxyXG4gIC8vIENvbnRlbnQtVHlwZSBpc24ndCBzcGVjaWZpZWQsIEV4cHJlc3Mgc2lsZW50bHkgcmVmdXNlcyB0byBwYXJzZSB0aGVcclxuICAvLyByZXF1ZXN0IGJvZHkuXHJcbiAgcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gcmVxLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICdhcHBsaWNhdGlvbi9qc29uJztcclxuICByZXR1cm4gZXhwcmVzc0pTT05QYXJzZXIocmVxLCByZXMsIG5leHQpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHRoZSBiaXRnbyBvYmplY3QgaW4gdGhlIHJlcXVlc3RcclxuICogQHBhcmFtIGNvbmZpZ1xyXG4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZUJpdEdvKGNvbmZpZzogQ29uZmlnKSB7XHJcbiAgY29uc3QgeyBlbnYsIGN1c3RvbVJvb3RVcmksIGN1c3RvbUJpdGNvaW5OZXR3b3JrIH0gPSBjb25maWc7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbihyZXE6IGV4cHJlc3MuUmVxdWVzdCwgcmVzOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0OiBleHByZXNzLk5leHRGdW5jdGlvbikge1xyXG4gICAgLy8gR2V0IGFjY2VzcyB0b2tlblxyXG4gICAgbGV0IGFjY2Vzc1Rva2VuO1xyXG4gICAgaWYgKHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcclxuICAgICAgY29uc3QgYXV0aFNwbGl0ID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdCgnICcpO1xyXG4gICAgICBpZiAoYXV0aFNwbGl0Lmxlbmd0aCA9PT0gMiAmJiBhdXRoU3BsaXRbMF0udG9Mb3dlckNhc2UoKSA9PT0gJ2JlYXJlcicpIHtcclxuICAgICAgICBhY2Nlc3NUb2tlbiA9IGF1dGhTcGxpdFsxXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgdXNlckFnZW50ID0gcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXVxyXG4gICAgICA/IEJJVEdPRVhQUkVTU19VU0VSX0FHRU5UICsgJyAnICsgcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXVxyXG4gICAgICA6IEJJVEdPRVhQUkVTU19VU0VSX0FHRU5UO1xyXG4gICAgY29uc3QgYml0Z29Db25zdHJ1Y3RvclBhcmFtcyA9IHtcclxuICAgICAgZW52LFxyXG4gICAgICBjdXN0b21Sb290VVJJOiBjdXN0b21Sb290VXJpLFxyXG4gICAgICBjdXN0b21CaXRjb2luTmV0d29yayxcclxuICAgICAgYWNjZXNzVG9rZW4sXHJcbiAgICAgIHVzZXJBZ2VudCxcclxuICAgIH07XHJcblxyXG4gICAgcmVxLmJpdGdvID0gbmV3IEJpdEdvKGJpdGdvQ29uc3RydWN0b3JQYXJhbXMpO1xyXG4gICAgKHJlcS5iaXRnbyBhcyBhbnkpLl9wcm9taXNlLmxvbmdTdGFja1N1cHBvcnQgPSB0cnVlO1xyXG5cclxuICAgIG5leHQoKTtcclxuICB9O1xyXG59XHJcblxyXG4vKipcclxuICogUHJvbWlzZSBoYW5kbGVyIHdyYXBwZXIgdG8gaGFuZGxlIHNlbmRpbmcgcmVzcG9uc2VzIGFuZCBlcnJvciBjYXNlc1xyXG4gKiBAcGFyYW0gcHJvbWlzZVJlcXVlc3RIYW5kbGVyXHJcbiAqL1xyXG5mdW5jdGlvbiBwcm9taXNlV3JhcHBlcihwcm9taXNlUmVxdWVzdEhhbmRsZXI6IEZ1bmN0aW9uKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSB7XHJcbiAgICBkZWJ1ZyhgaGFuZGxlOiAke3JlcS5tZXRob2R9ICR7cmVxLm9yaWdpbmFsVXJsfWApO1xyXG4gICAgYmx1ZWJpcmRcclxuICAgICAgLnRyeShwcm9taXNlUmVxdWVzdEhhbmRsZXIuYmluZChudWxsLCByZXEsIHJlcywgbmV4dCkpXHJcbiAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdDogYW55KSB7XHJcbiAgICAgICAgbGV0IHN0YXR1cyA9IDIwMDtcclxuICAgICAgICBpZiAocmVzdWx0Ll9fcmVkaXJlY3QpIHtcclxuICAgICAgICAgIHJlcy5yZWRpcmVjdChyZXN1bHQudXJsKTtcclxuICAgICAgICAgIHN0YXR1cyA9IDMwMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC5fX3JlbmRlcikge1xyXG4gICAgICAgICAgcmVzLnJlbmRlcihyZXN1bHQudGVtcGxhdGUsIHJlc3VsdC5wYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXMuc3RhdHVzKHN0YXR1cykuc2VuZChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uKGNhdWdodCkge1xyXG4gICAgICAgIGxldCBlcnI7XHJcbiAgICAgICAgaWYgKGNhdWdodCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgICBlcnIgPSBjYXVnaHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2F1Z2h0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgZXJyID0gbmV3IEVycm9yKCcoc3RyaW5nX2Vycm9yKSAnICsgY2F1Z2h0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXJyID0gbmV3IEVycm9yKCcob2JqZWN0X2Vycm9yKSAnICsgSlNPTi5zdHJpbmdpZnkoY2F1Z2h0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyLm1lc3NhZ2UgfHwgJ2xvY2FsIGVycm9yJztcclxuICAgICAgICAvLyB1c2UgYXR0YWNoZWQgcmVzdWx0LCBvciBtYWtlIG9uZVxyXG4gICAgICAgIGxldCByZXN1bHQgPSBlcnIucmVzdWx0IHx8IHsgZXJyb3I6IG1lc3NhZ2UgfTtcclxuICAgICAgICByZXN1bHQgPSBfLmV4dGVuZCh7fSwgcmVzdWx0KTtcclxuICAgICAgICByZXN1bHQubWVzc2FnZSA9IGVyci5tZXNzYWdlO1xyXG4gICAgICAgIGNvbnN0IHN0YXR1cyA9IGVyci5zdGF0dXMgfHwgNTAwO1xyXG4gICAgICAgIGlmICghKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yICVzOiAlcycsIHN0YXR1cywgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5zdGF0dXMoc3RhdHVzKS5zZW5kKHJlc3VsdCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5kb25lKCk7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwUm91dGVzKGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbiwgY29uZmlnOiBDb25maWcpIHtcclxuICAvLyBXaGVuIGFkZGluZyBuZXcgcm91dGVzIHRvIEJpdEdvIEV4cHJlc3MgbWFrZSBzdXJlIHRoYXQgeW91IGFsc28gYWRkIHRoZSBleGFjdCBzYW1lIHJvdXRlcyB0byB0aGUgc2VydmVyLiBTaW5jZVxyXG4gIC8vIHNvbWUgY3VzdG9tZXJzIHdlcmUgY29uZnVzZWQgd2hlbiBjYWxsaW5nIGEgQml0R28gRXhwcmVzcyByb3V0ZSBvbiB0aGUgQml0R28gc2VydmVyLCB3ZSBub3cgaGFuZGxlIGFsbCBCaXRHb1xyXG4gIC8vIEV4cHJlc3Mgcm91dGVzIG9uIHRoZSBCaXRHbyBzZXJ2ZXIgYW5kIHJldHVybiBhbiBlcnJvciBtZXNzYWdlIHRoYXQgc2F5cyB0aGF0IG9uZSBzaG91bGQgY2FsbCBCaXRHbyBFeHByZXNzXHJcbiAgLy8gaW5zdGVhZC5cclxuICAvLyBWMSByb3V0ZXMgc2hvdWxkIGJlIGFkZGVkIHRvIHd3dy9jb25maWcvcm91dGVzLmpzXHJcbiAgLy8gVjIgcm91dGVzIHNob3VsZCBiZSBhZGRlZCB0byB3d3cvY29uZmlnL3JvdXRlc1YyLmpzXHJcblxyXG4gIC8vIHBpbmdcclxuICAvLyAvYXBpL3ZbMTJdL3BpbmdleHByZXNzIGlzIHRoZSBvbmx5IGV4Y2VwdGlvbiB0byB0aGUgcnVsZSBhYm92ZSwgYXMgaXQgZXhwbGljaXRseSBjaGVja3MgdGhlIGhlYWx0aCBvZiB0aGVcclxuICAvLyBleHByZXNzIHNlcnZlciB3aXRob3V0IHJ1bm5pbmcgaW50byByYXRlIGxpbWl0aW5nIHdpdGggdGhlIEJpdEdvIHNlcnZlci5cclxuICBhcHAuZ2V0KCcvYXBpL3ZbMTJdL3BpbmcnLCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlUGluZykpO1xyXG4gIGFwcC5nZXQoJy9hcGkvdlsxMl0vcGluZ2V4cHJlc3MnLCBwcm9taXNlV3JhcHBlcihoYW5kbGVQaW5nRXhwcmVzcykpO1xyXG5cclxuICAvLyBhdXRoXHJcbiAgYXBwLnBvc3QoJy9hcGkvdlsxMl0vdXNlci9sb2dpbicsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZUxvZ2luKSk7XHJcblxyXG4gIGFwcC5wb3N0KCcvYXBpL3ZbMTJdL2RlY3J5cHQnLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVEZWNyeXB0KSk7XHJcbiAgYXBwLnBvc3QoJy9hcGkvdlsxMl0vZW5jcnlwdCcsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZUVuY3J5cHQpKTtcclxuICBhcHAucG9zdCgnL2FwaS92WzEyXS92ZXJpZnlhZGRyZXNzJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVmVyaWZ5QWRkcmVzcykpO1xyXG4gIGFwcC5wb3N0KFxyXG4gICAgJy9hcGkvdlsxMl0vY2FsY3VsYXRlbWluZXJmZWVpbmZvJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlQ2FsY3VsYXRlTWluZXJGZWVJbmZvKVxyXG4gICk7XHJcblxyXG4gIGFwcC5wb3N0KCcvYXBpL3YxL2tleWNoYWluL2xvY2FsJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlQ3JlYXRlTG9jYWxLZXlDaGFpbikpO1xyXG4gIGFwcC5wb3N0KCcvYXBpL3YxL2tleWNoYWluL2Rlcml2ZScsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZURlcml2ZUxvY2FsS2V5Q2hhaW4pKTtcclxuICBhcHAucG9zdChcclxuICAgICcvYXBpL3YxL3dhbGxldHMvc2ltcGxlY3JlYXRlJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlQ3JlYXRlV2FsbGV0V2l0aEtleWNoYWlucylcclxuICApO1xyXG5cclxuICBhcHAucG9zdCgnL2FwaS92MS93YWxsZXQvOmlkL3NlbmRjb2lucycsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVNlbmRDb2lucykpO1xyXG4gIGFwcC5wb3N0KCcvYXBpL3YxL3dhbGxldC86aWQvc2VuZG1hbnknLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVTZW5kTWFueSkpO1xyXG4gIGFwcC5wb3N0KFxyXG4gICAgJy9hcGkvdjEvd2FsbGV0LzppZC9jcmVhdGV0cmFuc2FjdGlvbicsXHJcbiAgICBwYXJzZUJvZHksXHJcbiAgICBwcmVwYXJlQml0R28oY29uZmlnKSxcclxuICAgIHByb21pc2VXcmFwcGVyKGhhbmRsZUNyZWF0ZVRyYW5zYWN0aW9uKVxyXG4gICk7XHJcbiAgYXBwLnBvc3QoXHJcbiAgICAnL2FwaS92MS93YWxsZXQvOmlkL3NpZ250cmFuc2FjdGlvbicsXHJcbiAgICBwYXJzZUJvZHksXHJcbiAgICBwcmVwYXJlQml0R28oY29uZmlnKSxcclxuICAgIHByb21pc2VXcmFwcGVyKGhhbmRsZVNpZ25UcmFuc2FjdGlvbilcclxuICApO1xyXG5cclxuICBhcHAucG9zdCgnL2FwaS92MS93YWxsZXQvOmlkL3NpbXBsZXNoYXJlJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlU2hhcmVXYWxsZXQpKTtcclxuICBhcHAucG9zdChcclxuICAgICcvYXBpL3YxL3dhbGxldHNoYXJlLzpzaGFyZUlkL2FjY2VwdFNoYXJlJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlQWNjZXB0U2hhcmUpXHJcbiAgKTtcclxuXHJcbiAgYXBwLnB1dChcclxuICAgICcvYXBpL3YxL3BlbmRpbmdhcHByb3ZhbHMvOmlkL2V4cHJlc3MnLFxyXG4gICAgcGFyc2VCb2R5LFxyXG4gICAgcHJlcGFyZUJpdEdvKGNvbmZpZyksXHJcbiAgICBwcm9taXNlV3JhcHBlcihoYW5kbGVBcHByb3ZlVHJhbnNhY3Rpb24pXHJcbiAgKTtcclxuICBhcHAucHV0KFxyXG4gICAgJy9hcGkvdjEvcGVuZGluZ2FwcHJvdmFscy86aWQvY29uc3RydWN0VHgnLFxyXG4gICAgcGFyc2VCb2R5LFxyXG4gICAgcHJlcGFyZUJpdEdvKGNvbmZpZyksXHJcbiAgICBwcm9taXNlV3JhcHBlcihoYW5kbGVDb25zdHJ1Y3RBcHByb3ZhbFR4KVxyXG4gICk7XHJcblxyXG4gIGFwcC5wdXQoXHJcbiAgICAnL2FwaS92MS93YWxsZXQvOmlkL2NvbnNvbGlkYXRldW5zcGVudHMnLFxyXG4gICAgcGFyc2VCb2R5LFxyXG4gICAgcHJlcGFyZUJpdEdvKGNvbmZpZyksXHJcbiAgICBwcm9taXNlV3JhcHBlcihoYW5kbGVDb25zb2xpZGF0ZVVuc3BlbnRzKVxyXG4gICk7XHJcbiAgYXBwLnB1dCgnL2FwaS92MS93YWxsZXQvOmlkL2Zhbm91dHVuc3BlbnRzJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlRmFuT3V0VW5zcGVudHMpKTtcclxuXHJcbiAgLy8gYW55IG90aGVyIEFQSSBjYWxsXHJcbiAgYXBwLnVzZSgnL2FwaS92WzFdLyonLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVSRVNUKSk7XHJcblxyXG4gIC8vIEFQSSB2MlxyXG5cclxuICAvLyBjcmVhdGUga2V5Y2hhaW5cclxuICBhcHAucG9zdChcclxuICAgICcvYXBpL3YyLzpjb2luL2tleWNoYWluL2xvY2FsJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVjJDcmVhdGVMb2NhbEtleUNoYWluKVxyXG4gICk7XHJcblxyXG4gIC8vIGdlbmVyYXRlIHdhbGxldFxyXG4gIGFwcC5wb3N0KCcvYXBpL3YyLzpjb2luL3dhbGxldC9nZW5lcmF0ZScsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyR2VuZXJhdGVXYWxsZXQpKTtcclxuXHJcbiAgLy8gc2hhcmUgd2FsbGV0XHJcbiAgYXBwLnBvc3QoJy9hcGkvdjIvOmNvaW4vd2FsbGV0LzppZC9zaGFyZScsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyU2hhcmVXYWxsZXQpKTtcclxuICBhcHAucG9zdChcclxuICAgICcvYXBpL3YyLzpjb2luL3dhbGxldHNoYXJlLzppZC9hY2NlcHRzaGFyZScsXHJcbiAgICBwYXJzZUJvZHksXHJcbiAgICBwcmVwYXJlQml0R28oY29uZmlnKSxcclxuICAgIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyQWNjZXB0V2FsbGV0U2hhcmUpXHJcbiAgKTtcclxuICAvLyBzaWduIHRyYW5zYWN0aW9uXHJcbiAgYXBwLnBvc3QoJy9hcGkvdjIvOmNvaW4vc2lnbnR4JywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVjJTaWduVHgpKTtcclxuICBhcHAucG9zdCgnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL3NpZ250eCcsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyU2lnblR4V2FsbGV0KSk7XHJcbiAgYXBwLnBvc3QoXHJcbiAgICAnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL3JlY292ZXJ0b2tlbicsXHJcbiAgICBwYXJzZUJvZHksXHJcbiAgICBwcmVwYXJlQml0R28oY29uZmlnKSxcclxuICAgIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyUmVjb3ZlclRva2VuKVxyXG4gICk7XHJcblxyXG4gIC8vIHNlbmQgdHJhbnNhY3Rpb25cclxuICBhcHAucG9zdCgnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL3NlbmRjb2lucycsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyU2VuZE9uZSkpO1xyXG4gIGFwcC5wb3N0KCcvYXBpL3YyLzpjb2luL3dhbGxldC86aWQvc2VuZG1hbnknLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVWMlNlbmRNYW55KSk7XHJcblxyXG4gIC8vIHVuc3BlbnQgY2hhbmdlc1xyXG4gIGFwcC5wb3N0KFxyXG4gICAgJy9hcGkvdjIvOmNvaW4vd2FsbGV0LzppZC9jb25zb2xpZGF0ZXVuc3BlbnRzJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVjJDb25zb2xpZGF0ZVVuc3BlbnRzKVxyXG4gICk7XHJcbiAgYXBwLnBvc3QoXHJcbiAgICAnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL2Zhbm91dHVuc3BlbnRzJyxcclxuICAgIHBhcnNlQm9keSxcclxuICAgIHByZXBhcmVCaXRHbyhjb25maWcpLFxyXG4gICAgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVjJGYW5PdXRVbnNwZW50cylcclxuICApO1xyXG5cclxuICBhcHAucG9zdCgnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL3N3ZWVwJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlVjJTd2VlcCkpO1xyXG5cclxuICAvLyBDUEZQXHJcbiAgYXBwLnBvc3QoXHJcbiAgICAnL2FwaS92Mi86Y29pbi93YWxsZXQvOmlkL2FjY2VsZXJhdGV0eCcsXHJcbiAgICBwYXJzZUJvZHksXHJcbiAgICBwcmVwYXJlQml0R28oY29uZmlnKSxcclxuICAgIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyQWNjZWxlcmF0ZVRyYW5zYWN0aW9uKVxyXG4gICk7XHJcblxyXG4gIC8vIE1pc2NlbGxhbmVvdXNcclxuICBhcHAucG9zdCgnL2FwaS92Mi86Y29pbi9jYW5vbmljYWxhZGRyZXNzJywgcGFyc2VCb2R5LCBwcmVwYXJlQml0R28oY29uZmlnKSwgcHJvbWlzZVdyYXBwZXIoaGFuZGxlQ2Fub25pY2FsQWRkcmVzcykpO1xyXG4gIGFwcC5wb3N0KCcvYXBpL3YyLzpjb2luL3ZlcmlmeWFkZHJlc3MnLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVWMlZlcmlmeUFkZHJlc3MpKTtcclxuICBhcHAucHV0KFxyXG4gICAgJy9hcGkvdjIvOmNvaW4vcGVuZGluZ2FwcHJvdmFscy86aWQnLFxyXG4gICAgcGFyc2VCb2R5LFxyXG4gICAgcHJlcGFyZUJpdEdvKGNvbmZpZyksXHJcbiAgICBwcm9taXNlV3JhcHBlcihoYW5kbGVWMlBlbmRpbmdBcHByb3ZhbClcclxuICApO1xyXG5cclxuICAvLyBhbnkgb3RoZXIgQVBJIHYyIGNhbGxcclxuICBhcHAudXNlKCcvYXBpL3YyL3VzZXIvKicsIHBhcnNlQm9keSwgcHJlcGFyZUJpdEdvKGNvbmZpZyksIHByb21pc2VXcmFwcGVyKGhhbmRsZVYyVXNlclJFU1QpKTtcclxuICBhcHAudXNlKCcvYXBpL3YyLzpjb2luLyonLCBwYXJzZUJvZHksIHByZXBhcmVCaXRHbyhjb25maWcpLCBwcm9taXNlV3JhcHBlcihoYW5kbGVWMkNvaW5TcGVjaWZpY1JFU1QpKTtcclxufVxyXG4iXX0=