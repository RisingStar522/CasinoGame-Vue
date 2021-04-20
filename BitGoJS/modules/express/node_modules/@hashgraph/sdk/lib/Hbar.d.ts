import BigNumber from "bignumber.js";
import { HbarUnit } from "./HbarUnit";
import { UInt64Value } from "google-protobuf/google/protobuf/wrappers_pb";
export declare type Tinybar = BigNumber.Value;
declare const hbarTinybar: unique symbol;
export declare const hbarToProto: unique symbol;
export declare const hbarToProtoValue: unique symbol;
export declare const hbarCheck: unique symbol;
/**
 * Typesafe wrapper for values of HBAR providing foolproof conversions to other denominations.
 */
export declare class Hbar {
    /** The HBAR value in tinybar, used natively by the SDK and Hedera itself */
    private [hbarTinybar];
    constructor(amount: BigNumber.Value);
    static readonly MAX: Hbar;
    static readonly MIN: Hbar;
    static readonly ZERO: Hbar;
    /**
     * Calculate the HBAR amount given a raw value and a unit.
     */
    static from(amount: BigNumber.Value, unit: HbarUnit): Hbar;
    /** Get HBAR from a tinybar amount, may be a string */
    static fromTinybar(amount: Tinybar): Hbar;
    /**
     * Wrap a raw value of HBAR, may be a string.
     * @deprecate Use constructor instead. `new Hbar(amount)`
     */
    static of(amount: BigNumber.Value): Hbar;
    static zero(): Hbar;
    toString(): string;
    value(): BigNumber;
    asTinybar(): BigNumber;
    as(unit: HbarUnit): BigNumber;
    multipliedBy(amount: BigNumber.Value): Hbar;
    plus(hbar: Hbar): Hbar;
    plus(amount: BigNumber.Value, unit: HbarUnit): Hbar;
    minus(hbar: Hbar): Hbar;
    minus(amount: BigNumber.Value, unit: HbarUnit): Hbar;
    isEqualTo(hbar: Hbar): boolean;
    isEqualTo(amount: BigNumber.Value, unit: HbarUnit): boolean;
    isGreaterThan(hbar: Hbar): boolean;
    isGreaterThan(amount: BigNumber.Value, unit: HbarUnit): boolean;
    isGreaterThanOrEqualTo(hbar: Hbar): boolean;
    isGreaterThanOrEqualTo(amount: BigNumber.Value, unit: HbarUnit): boolean;
    isLessThan(hbar: Hbar): boolean;
    isLessThan(amount: BigNumber.Value, unit: HbarUnit): boolean;
    isLessThanOrEqualTo(hbar: Hbar): boolean;
    isLessThanOrEqualTo(amount: BigNumber.Value, unit: HbarUnit): boolean;
    comparedTo(hbar: Hbar): number;
    comparedTo(amount: BigNumber.Value, unit: HbarUnit): number;
    isZero(): boolean;
    negated(): Hbar;
    isNegative(): boolean;
    isPositive(): boolean;
    [hbarCheck]({ allowNegative }: {
        allowNegative: boolean;
    }): void;
    [hbarToProto](): string;
    [hbarToProtoValue](): UInt64Value;
}
export declare function hbarFromTinybarOrHbar(number: Hbar | Tinybar): Hbar;
export {};
