"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _grpcJs = require("@grpc/grpc-js");

var _Channel = _interopRequireDefault(require("./Channel.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @property {?proto.CryptoService} _crypto
 * @property {?proto.SmartContractService} _smartContract
 * @property {?proto.FileService} _file
 * @property {?proto.FreezeService} _freeze
 * @property {?proto.ConsensusService} _consensus
 * @property {?proto.NetworkService} _network
 */
class NodeChannel extends _Channel.default {
  /**
   * @internal
   * @param {string} address
   */
  constructor(address) {
    super();
    /**
     * @type {Client}
     * @private
     */

    this._client = new _grpcJs.Client(address, _grpcJs.credentials.createInsecure());
  }
  /**
   * @override
   * @returns {void}
   */


  close() {
    this._client.close();
  }
  /**
   * @override
   * @protected
   * @param {string} serviceName
   * @returns {import("protobufjs").RPCImpl}
   */


  _createUnaryClient(serviceName) {
    return (method, requestData, callback) => {
      this._client.makeUnaryRequest(`/proto.${serviceName}/${method.name}`, value => value, value => value, Buffer.from(requestData), callback);
    };
  }

}

exports.default = NodeChannel;