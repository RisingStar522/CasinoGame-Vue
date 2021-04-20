import { SingleTransactionBuilder } from "../TransactionBuilder";
import { Transaction } from "../generated/Transaction_pb";
import { TransactionResponse } from "../generated/TransactionResponse_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { ContractIdLike } from "./ContractId";
import { ContractFunctionParams } from "./ContractFunctionParams";
import { Hbar, Tinybar } from "../Hbar";
import BigNumber from "bignumber.js";
/**
 * Call a function of the given smart contract instance, giving it functionParameters as its inputs.
 * It can use the given amount of gas, and any unspent gas will be refunded to the paying account.
 *
 * If this function stores information, it is charged gas to store it. There is a fee in hbars to
 * maintain that storage until the expiration time, and that fee is added as part of the
 * transaction fee.
 */
export declare class ContractExecuteTransaction extends SingleTransactionBuilder {
    private readonly _body;
    constructor();
    /**
     * The maximum amount of gas to use for the call.
     */
    setGas(gas: number | BigNumber): this;
    /**
     * Number of tinybars sent (the function must be payable if this is nonzero).
     */
    setPayableAmount(amount: Tinybar | Hbar): this;
    /**
     * Which function to call, and the parameters to pass to the function.
     */
    setFunction(name: string, params: ContractFunctionParams): this;
    /**
     * The contract instance to call, in the format used in transactions.
     */
    setContractId(contractIdLike: ContractIdLike): this;
    protected _doValidate(errors: string[]): void;
    protected get _method(): grpc.UnaryMethodDefinition<Transaction, TransactionResponse>;
}
