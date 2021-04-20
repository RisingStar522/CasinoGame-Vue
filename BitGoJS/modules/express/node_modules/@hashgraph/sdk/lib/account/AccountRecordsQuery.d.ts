import { QueryBuilder } from "../QueryBuilder";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { Response } from "../generated/Response_pb";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { AccountIdLike } from "./AccountId";
import { TransactionRecord } from "../TransactionRecord";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
/**
 * Get all the records for an account for any transfers into it and out of it, that were above the
 * threshold, during the last 25 hours.
 */
export declare class AccountRecordsQuery extends QueryBuilder<TransactionRecord[]> {
    private readonly _builder;
    constructor();
    /**
     * The account that this record is for.
     */
    setAccountId(accountId: AccountIdLike): this;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): TransactionRecord[];
}
