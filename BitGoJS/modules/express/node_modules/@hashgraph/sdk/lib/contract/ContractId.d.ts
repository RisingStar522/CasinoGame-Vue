import { ContractID, Key } from "../generated/BasicTypes_pb";
import { PublicKey } from "../crypto/PublicKey";
/** Normalized contract ID returned by various methods in the SDK. */
export declare class ContractId extends PublicKey {
    shard: number;
    realm: number;
    contract: number;
    constructor(shard: number, realm: number, contract: number);
    constructor(contractId: ContractIdLike);
    static fromString(id: string): ContractId;
    static _fromProto(contractId: ContractID): ContractId;
    toString(): string;
    static fromSolidityAddress(address: string): ContractId;
    toSolidityAddress(): string;
    _toProto(): ContractID;
    _toProtoKey(): Key;
}
/**
 * Input type for an ID of a contract on the network.
 *
 * In any form, `shard` and `realm` are assumed to be 0 if not provided.
 *
 * Strings may take the form `'<shard>.<realm>.<contract>'` or `'<contract>'`.
 *
 * A bare `number` will be taken as the contract number with shard and realm of 0.
 */
export declare type ContractIdLike = {
    shard?: number;
    realm?: number;
    contract: number;
} | string | number | ContractId;
