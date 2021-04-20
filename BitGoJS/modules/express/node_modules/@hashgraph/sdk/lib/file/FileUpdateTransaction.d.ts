import { SingleTransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { FileIdLike } from "../file/FileId";
import { PublicKey } from "../crypto/PublicKey";
/**
 * Modify some of the metadata for a file. Any null field is ignored (left unchanged). Any field
 * that is null is left unchanged. If contents is non-null, then the file's contents will be
 * replaced with the given bytes. This transaction must be signed by all the keys for that file.
 * If the transaction is modifying the keys field, then it must be signed by all the keys in both
 * the old list and the new list.
 *
 * If a file was created without ANY keys in the keys field, ONLY the expirationTime of the file
 * can be changed using this call. The file contents or its keys cannot be changed.
 */
export declare class FileUpdateTransaction extends SingleTransactionBuilder {
    private readonly _body;
    constructor();
    /**
     * The new time at which it should expire (ignored if not later than the current value).
     */
    setExpirationTime(date: number | Date): this;
    /**
     * The keys that can modify or delete the file.
     */
    addKey(key: PublicKey): this;
    /**
     * The new file contents. All the bytes in the old contents are discarded.
     */
    setContents(contents: Uint8Array | string): this;
    /**
     * The file ID of the file to update.
     */
    setFileId(fileIdLike: FileIdLike): this;
    protected _doValidate(errors: string[]): void;
    protected get _method(): grpc.UnaryMethodDefinition<Transaction, TransactionResponse>;
}
