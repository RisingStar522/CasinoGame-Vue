export function keccak256(message: string): Uint8Array;
export type Keccak = {
    blocks: number[];
    blockCount: number;
    outputBlocks: number;
    s: number[];
    start: number;
    block: number;
    reset: boolean;
    lastByteIndex: number | null;
};
