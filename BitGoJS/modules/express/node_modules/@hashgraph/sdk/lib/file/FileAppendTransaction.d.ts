import { SingleTransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { FileIdLike } from "../file/FileId";
/**
 * Append the given contents to the end of the file. If a file is too big to create with a single
 * `FileCreateTransaction``, then it can be created with the first part of its contents, and then
 * appended multiple times to create the entire file.
 */
export declare class FileAppendTransaction extends SingleTransactionBuilder {
    private readonly _body;
    constructor();
    /**
     * The file ID of the file to which the bytes are appended to.
     */
    setFileId(fileId: FileIdLike): this;
    /**
     * The bytes to append to the contents of the file.
     */
    setContents(contents: Uint8Array | string): this;
    protected _doValidate(errors: string[]): void;
    protected get _method(): grpc.UnaryMethodDefinition<Transaction, TransactionResponse>;
}
