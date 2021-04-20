import { SingleTransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
import { AccountIdLike } from "./AccountId";
/**
 * Mark an account as deleted, moving all its current hbars to another account. It will remain in
 * the ledger, marked as deleted, until it expires. Transfers into it a deleted account fail. But
 * a deleted account can still have its expiration extended in the normal way.
 */
export declare class AccountDeleteTransaction extends SingleTransactionBuilder {
    private _body;
    constructor();
    /**
     * Sets the account to delete. Note: To successfully delete an account
     * one must also manually set the `TransactionId` to a `TransactionId`
     * constructed from the same `AccountId`
     *
     * The account ID which should be deleted.
     */
    setDeleteAccountId(accountId: AccountIdLike): this;
    /**
     * The account ID which will receive all remaining hbars.
     */
    setTransferAccountId(accountId: AccountIdLike): this;
    protected get _method(): UnaryMethodDefinition<Transaction, TransactionResponse>;
    _doValidate(errors: string[]): void;
}
