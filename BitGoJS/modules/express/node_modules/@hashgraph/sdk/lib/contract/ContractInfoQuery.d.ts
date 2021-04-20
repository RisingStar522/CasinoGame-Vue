import { QueryBuilder } from "../QueryBuilder";
import { QueryHeader } from "../generated/QueryHeader_pb";
import { Query } from "../generated/Query_pb";
import { grpc } from "@improbable-eng/grpc-web";
import { Response } from "../generated/Response_pb";
import { ContractId, ContractIdLike } from "./ContractId";
import { AccountId } from "../account/AccountId";
import { ResponseHeader } from "../generated/ResponseHeader_pb";
import { PublicKey } from "../crypto/PublicKey";
import { BaseClient } from "../BaseClient";
import { Hbar } from "../Hbar";
/**
 * Response when the client sends the node ContractGetInfoQuery
 */
export interface ContractInfo {
    /**
     * ID of the contract instance, in the format used in transactions.
     */
    contractId: ContractId;
    /**
     * ID of the cryptocurrency account owned by the contract instance,
     * in the format used in transactions.
     */
    accountId: AccountId;
    /**
     * ID of both the contract instance and the cryptocurrency account owned by the contract
     * instance, in the format used by Solidity.
     */
    contractAccountId: string;
    /**
     * The state of the instance and its fields can be modified arbitrarily if this key signs a
     * transaction to modify it. If this is null, then such modifications are not possible,
     * and there is no administrator that can override the normal operation of this smart
     * contract instance. Note that if it is created with no admin keys, then there is no
     * administrator to authorize changing the admin keys, so there can never be any admin keys
     * for that instance.
     */
    adminKey: PublicKey | null;
    /**
     * The current time at which this contract instance (and its account) is set to expire.
     */
    expirationTime: Date;
    /**
     * The expiration time will extend every this many seconds. If there are insufficient funds,
     * then it extends as long as possible. If the account is empty when it expires,
     * then it is deleted.
     */
    autoRenewPeriod: number;
    /**
     * Number of bytes of storage being used by this instance (which affects the cost to
     * extend the expiration time).
     */
    storage: number;
    /**
     * The memo associated with the contract (max 100 bytes).
     */
    contractMemo: string;
}
/**
 * Get information about a smart contract instance. This includes the account that it uses, the
 * file containing its bytecode, and the time when it will expire.
 */
export declare class ContractInfoQuery extends QueryBuilder<ContractInfo> {
    private readonly _builder;
    constructor();
    /**
     * The contract for which information is requested.
     */
    setContractId(contractIdLike: ContractIdLike): this;
    /**
     * Wrapper around `QueryBuilder.getCost()`. This must exist because the cost returned
     * `QueryBuilder.getCost()` and therein the Hedera Network doesn't work for any
     * contracts that have been deleted. In that case we want the minimum
     * cost to be ~25 Tinybar as this seems to succeed most of the time.
     */
    getCost(client: BaseClient): Promise<Hbar>;
    protected _doLocalValidate(errors: string[]): void;
    protected _getMethod(): grpc.UnaryMethodDefinition<Query, Response>;
    protected _getHeader(): QueryHeader;
    protected _mapResponseHeader(response: Response): ResponseHeader;
    protected _mapResponse(response: Response): ContractInfo;
}
