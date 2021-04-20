import { ContractLogInfo } from "./ContractLogInfo";
import * as pb from "../generated/ContractCallLocal_pb";
import { ContractId } from "./ContractId";
import BigNumber from "bignumber.js";
/**
 * The result returned by a call to a smart contract function. This is part of the response to
 * a ContractCallLocal query, and is in the record for a ContractCall or ContractCreateInstance
 * transaction. The ContractCreateInstance transaction record has the results of the call to
 * the constructor.
 */
export declare class ContractFunctionResult {
    /**
     * The smart contract instance whose function was called.
     */
    readonly contractId: ContractId | null;
    /**
     * Message In case there was an error during smart contract execution.
     */
    readonly errorMessage: string;
    /**
     * Bloom filter for record
     */
    readonly bloom: Uint8Array;
    /**
     * Units of gas used  to execute contract.
     */
    readonly gasUsed: number;
    /**
     * The log info for events returned by the function.
     */
    readonly logs: ContractLogInfo[];
    private readonly ["bytes"];
    constructor(result: pb.ContractFunctionResult | Uint8Array);
    asBytes(): Uint8Array;
    getString(index?: number): string;
    private getBytes;
    getBytes32(index?: number): Uint8Array;
    getBool(index?: number): boolean;
    getInt8(index?: number): number;
    getInt32(index?: number): number;
    getInt64(index?: number): BigNumber;
    getInt256(index?: number): BigNumber;
    getUint8(index?: number): number;
    getUint32(index?: number): number;
    getUint64(index?: number): BigNumber;
    getUint256(index?: number): BigNumber;
    getAddress(index?: number): string;
    _getBytes32(index?: number): Uint8Array;
}
