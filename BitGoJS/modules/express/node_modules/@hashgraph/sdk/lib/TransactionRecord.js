"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferListToSdk = exports.TransactionRecord = void 0;
const TransactionReceipt_1 = require("./TransactionReceipt");
const ContractFunctionResult_1 = require("./contract/ContractFunctionResult");
const TransactionId_1 = require("./TransactionId");
const Time_1 = require("./Time");
const Hbar_1 = require("./Hbar");
const Transfer_1 = require("./Transfer");
const callResult = Symbol("callResult");
const callResultIsCreate = Symbol("callResultIsCreate");
/**
 * Response when the client sends the node TransactionGetRecordResponse.
 */
class TransactionRecord {
    constructor(record) {
        this[_a] = null;
        this[_b] = false;
        this.receipt = TransactionReceipt_1.TransactionReceipt._fromProto(record.getReceipt());
        this.transactionHash = record.getTransactionhash_asU8();
        this.consensusTimestamp = Time_1.Time._fromProto(record.getConsensustimestamp());
        this.transactionId = TransactionId_1.TransactionId._fromProto(record.getTransactionid());
        this.transactionMemo = record.getMemo();
        this.transactionFee = Hbar_1.Hbar.fromTinybar(record.getTransactionfee());
        this.transfers = transferListToSdk(record.getTransferlist());
        if (record.hasContractcallresult()) {
            this[callResult] = new ContractFunctionResult_1.ContractFunctionResult(record.getContractcallresult());
            this[callResultIsCreate] = true;
        }
        else if (record.hasContractcreateresult()) {
            this[callResult] = new ContractFunctionResult_1.ContractFunctionResult(record.getContractcreateresult());
        }
    }
    static _fromProto(pb) {
        return new TransactionRecord(pb);
    }
    getContractCreateResult() {
        if (this[callResult] == null || this[callResultIsCreate]) {
            throw new Error("record does not contain a contract create result");
        }
        return this[callResult];
    }
    getContractExecuteResult() {
        if (this[callResult] == null || !this[callResultIsCreate]) {
            throw new Error("record does not contain a contract execute result");
        }
        return this[callResult];
    }
}
exports.TransactionRecord = TransactionRecord;
_a = callResult, _b = callResultIsCreate;
function transferListToSdk(transferList) {
    return transferList.getAccountamountsList().map(Transfer_1.transferFromProto);
}
exports.transferListToSdk = transferListToSdk;
