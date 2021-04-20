import { AccountID } from "../generated/BasicTypes_pb";
/** Normalized account ID returned by various methods in the SDK. */
export declare class AccountId {
    shard: number;
    realm: number;
    account: number;
    constructor(shard: number, realm: number, account: number);
    constructor(accountId: AccountIdLike);
    static fromString(id: string): AccountId;
    static _fromProto(accountId: AccountID): AccountId;
    toString(): string;
    static fromSolidityAddress(address: string): AccountId;
    toSolidityAddress(): string;
    _toProto(): AccountID;
}
/**
 * Input type for an ID of an account on the network.
 *
 * In any form, `shard` and `realm` are assumed to be 0 if not provided.
 *
 * Strings may take the form `'<shard>.<realm>.<account>'` or `'<account>'`.
 *
 * A bare `number` will be taken as the account number with shard and realm of 0.
 */
export declare type AccountIdLike = {
    shard?: number;
    realm?: number;
    account: number;
} | string | number | AccountId;
