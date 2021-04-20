import { TransactionReceipt } from "./TransactionReceipt";
import { ContractFunctionResult } from "./contract/ContractFunctionResult";
import { TransactionRecord as ProtoTransactionRecord } from "./generated/TransactionRecord_pb";
import { TransactionId } from "./TransactionId";
import { TransferList as ProtoTransferList } from "./generated/CryptoTransfer_pb";
import { Time } from "./Time";
import { Hbar } from "./Hbar";
import { Transfer } from "./Transfer";
declare const callResult: unique symbol;
declare const callResultIsCreate: unique symbol;
/**
 * Response when the client sends the node TransactionGetRecordResponse.
 */
export declare class TransactionRecord {
    private readonly [callResult];
    private readonly [callResultIsCreate];
    /**
     * The status (reach consensus, or failed, or is unknown) and the ID of
     * any new account/file/instance created.
     */
    readonly receipt: TransactionReceipt | null;
    /**
     * The hash of the Transaction that executed (not the hash of any Transaction that failed
     * for having a duplicate TransactionID).
     */
    readonly transactionHash: Uint8Array;
    /**
     * The consensus timestamp (or null if didn't reach consensus yet).
     */
    readonly consensusTimestamp: Time;
    /**
     * The ID of the transaction this record represents.
     */
    readonly transactionId: TransactionId;
    /**
     * The memo that was submitted as part of the transaction (max 100 bytes).
     */
    readonly transactionMemo: string;
    /**
     * The actual transaction fee charged,
     * not the original transactionFee value from TransactionBody.
     */
    readonly transactionFee: Hbar;
    /**
     * All hbar transfers as a result of this transaction, such as fees, or transfers performed
     * by the transaction, or by a smart contract it calls, or by the creation of threshold
     * records that it triggers.
     */
    readonly transfers: Transfer[];
    private constructor();
    static _fromProto(pb: ProtoTransactionRecord): TransactionRecord;
    getContractCreateResult(): ContractFunctionResult;
    getContractExecuteResult(): ContractFunctionResult;
}
export declare function transferListToSdk(transferList: ProtoTransferList): Transfer[];
export {};
