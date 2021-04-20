import { QueryBuilder } from "../QueryBuilder";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { Response } from "../generated/Response_pb";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { AccountIdLike } from "./AccountId";
import { Transfer } from "../Transfer";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
/**
 * Get all the accounts that are proxy staking to this account. For each of them, give the amount
 * currently staked. This is not yet implemented, but will be in a future version of the API.
 */
export declare class AccountStakersQuery extends QueryBuilder<Transfer[]> {
    private readonly _builder;
    constructor();
    /**
     * The Account ID that is being proxy staked to.
     */
    setAccountId(accountId: AccountIdLike): this;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): Transfer[];
}
