import BigNumber from "bignumber.js";
export declare class HbarUnit {
    static readonly Tinybar: HbarUnit;
    static readonly Microbar: HbarUnit;
    static readonly Millibar: HbarUnit;
    static readonly Hbar: HbarUnit;
    static readonly Kilobar: HbarUnit;
    static readonly Megabar: HbarUnit;
    static readonly Gigabar: HbarUnit;
    private readonly _unit;
    private constructor();
    getSymbol(): string;
    _toTinybarCount(): BigNumber;
    toString(): string;
}
