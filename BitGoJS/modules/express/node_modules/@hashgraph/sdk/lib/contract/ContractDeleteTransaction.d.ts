import { SingleTransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { ContractIdLike } from "./ContractId";
import { AccountIdLike } from "../account/AccountId";
/**
 * Modify a smart contract instance to have the given parameter values. Any null field is ignored
 * (left unchanged). If only the contractInstanceExpirationTime is being modified, then no
 * signature is needed on this transaction other than for the account paying for the transaction
 * itself. But if any of the other fields are being modified, then it must be signed by the adminKey.
 * The use of adminKey is not currently supported in this API, but in the future will be implemented
 * to allow these fields to be modified, and also to make modifications to the state of the instance.
 * If the contract is created with no admin key, then none of the fields can be changed that need an
 * admin signature, and therefore no admin key can ever be added. So if there is no admin key, then
 * things like the bytecode are immutable. But if there is an admin key, then they can be changed.
 * For example, the admin key might be a threshold key, which requires 3 of 5 binding arbitration
 * judges to agree before the bytecode can be changed. This can be used to add flexibility to the
 * mangement of smart contract behavior. But this is optional. If the smart contract is created
 * without an admin key, then such a key can never be added, and its bytecode will be immutable.
 */
export declare class ContractDeleteTransaction extends SingleTransactionBuilder {
    private readonly _body;
    constructor();
    /**
     * The Contract ID instance to delete (this can't be changed).
     */
    setContractId(contractIdLike: ContractIdLike): this;
    /**
     * The account ID which will receive all remaining hbars.
     *
     * Note: Can only transfer to either an `AccountId` *or* `ContractId` not both.
     */
    setTransferAccountId(id: AccountIdLike): this;
    /**
     * The contract ID which will receive all remaining hbars
     *
     * Note: Can only transfer to either an `AccountId` *or* `ContractId` not both.
     */
    setTransferContractid(id: ContractIdLike): this;
    protected _doValidate(errors: string[]): void;
    protected get _method(): grpc.UnaryMethodDefinition<Transaction, TransactionResponse>;
}
