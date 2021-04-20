export declare enum ArgumentType {
    uint8 = 0,
    int8 = 1,
    uint16 = 2,
    int16 = 3,
    uint32 = 4,
    int32 = 5,
    uint64 = 6,
    int64 = 7,
    uint256 = 8,
    int256 = 9,
    string = 10,
    bool = 11,
    bytes = 12,
    bytes32 = 13,
    address = 14,
    func = 15
}
export interface SolidityType {
    ty: ArgumentType;
    array: boolean;
}
export declare class ContractFunctionSelector {
    private _name;
    private _params;
    _paramTypes: SolidityType[];
    constructor(name?: string | null);
    addString(): this;
    addStringArray(): this;
    addBytes(): this;
    addBytes32(): this;
    addBytesArray(): this;
    addBytes32Array(): this;
    addInt8(): this;
    addInt32(): this;
    addInt64(): this;
    addInt256(): this;
    addInt8Array(): this;
    addInt32Array(): this;
    addInt64Array(): this;
    addInt256Array(): this;
    addUint8(): this;
    addUint32(): this;
    addUint64(): this;
    addUint256(): this;
    addUint8Array(): this;
    addUint32Array(): this;
    addUint64Array(): this;
    addUint256Array(): this;
    addBool(): this;
    addAddress(): this;
    addAddressArray(): this;
    addFunction(): this;
    private _addParam;
    /**
     * NOT A STABLE API
     */
    _build(name: string | null): Uint8Array;
    toString(): string;
}
