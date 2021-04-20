import { QueryBuilder } from "../QueryBuilder";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { Query } from "../generated/Query_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { Response } from "../generated/Response_pb";
import { ContractIdLike } from "./ContractId";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
/**
 * Get the bytecode for a smart contract instance.
 */
export declare class ContractBytecodeQuery extends QueryBuilder<Uint8Array> {
    private readonly _builder;
    constructor();
    /**
     * The contract for which information is requested.
     */
    setContractId(contractIdLike: ContractIdLike): this;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): Uint8Array;
}
