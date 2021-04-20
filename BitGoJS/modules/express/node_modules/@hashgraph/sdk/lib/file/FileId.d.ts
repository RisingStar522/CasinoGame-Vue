import { FileID } from "../generated/BasicTypes_pb";
/** Normalized file ID returned by various methods in the SDK. */
export declare class FileId {
    shard: number;
    realm: number;
    file: number;
    /**
     * The public node address book for the current network.
     */
    static readonly ADDRESS_BOOK: FileId;
    /**
     * The current fee schedule for the network.
     */
    static readonly FEE_SCHEDULE: FileId;
    /**
     * The current exchange rate of HBAR to USD.
     */
    static readonly EXCHANGE_RATES: FileId;
    constructor(shard: number, realm: number, file: number);
    constructor(fileId: FileIdLike);
    static fromString(id: string): FileId;
    static _fromProto(fileId: FileID): FileId;
    toString(): string;
    static fromSolidityAddress(address: string): FileId;
    toSolidityAddress(): string;
    _toProto(): FileID;
}
/**
 * Input type for an ID of a file on the network.
 *
 * In any form, `shard` and `realm` are assumed to be 0 if not provided.
 *
 * Strings may take the form `'<shard>.<realm>.<file>'` or `'<file>'`.
 *
 * A bare `number` will be taken as the file number with shard and realm of 0.
 */
export declare type FileIdLike = {
    shard?: number;
    realm?: number;
    file: number;
} | string | number | FileId;
