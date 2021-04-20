import { QueryBuilder } from "../QueryBuilder";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { Query } from "../generated/Query_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { Response } from "../generated/Response_pb";
import { ContractIdLike } from "./ContractId";
import { ContractFunctionResult } from "./ContractFunctionResult";
import { ContractFunctionParams } from "./ContractFunctionParams";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
import { BaseClient } from "../BaseClient";
import { Hbar } from "../Hbar";
/**
 * Call a function of the given smart contract instance, giving it functionParameters as its inputs.
 * It will consume the entire given amount of gas.
 *
 * This is performed locally on the particular node that the client is communicating with. It cannot
 * change the state of the contract instance (and so, cannot spend anything from the instance's
 * cryptocurrency account). It will not have a consensus timestamp. It cannot generate a record or a
 * receipt. The response will contain the output returned by the function call.  This is useful for
 * calling getter functions, which purely read the state and don't change it. It is faster and
 * cheaper than a normal call, because it is purely local to a single  node.
 */
export declare class ContractCallQuery extends QueryBuilder<ContractFunctionResult> {
    private readonly _builder;
    constructor();
    /**
     * The contract instance to call, in the format used in transactions.
     */
    setContractId(contractIdLike: ContractIdLike): this;
    /**
     * Which function to call, and the parameters to pass to the function.
     */
    setFunction(name: string, params: ContractFunctionParams | null): this;
    /**
     * The amount of gas to use for the call. All of the gas offered will be charged for.
     */
    setGas(gas: number): this;
    /**
     * Max number of bytes that the result might include. The run will fail if it would have
     * returned more than this number of bytes.
     */
    setMaxResultSize(size: number): this;
    /**
     * Wrapper around `QueryBuilder.getCost()`. This must exist because the cost returned
     * `QueryBuilder.getCost()` and therein the Hedera Network doesn't work for
     * `ContractCallQuery`'s. However, if you multiply the cost by ~1.1 then _most_
     * contracts calls seem to complete fine.
     */
    getCost(client: BaseClient): Promise<Hbar>;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): ContractFunctionResult;
}
