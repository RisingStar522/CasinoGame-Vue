import { QueryBuilder } from "../QueryBuilder";
import { grpc } from "@improbable-eng/grpc-web";
import { Query } from "../generated/Query_pb";
import { Response } from "../generated/Response_pb";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { Hbar } from "../Hbar";
import { AccountIdLike } from "./AccountId";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
/**
 * Get the balance of a cryptocurrency account. This returns only the balance, so it is a smaller
 * and faster reply than CryptoGetInfo, which returns the balance plus additional information.
 */
export declare class AccountBalanceQuery extends QueryBuilder<Hbar> {
    private readonly _builder;
    constructor();
    /**
     * The account ID for which information is requested.
     */
    setAccountId(id: AccountIdLike): this;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): Hbar;
    protected _isPaymentRequired(): boolean;
}
