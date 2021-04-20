import { Timestamp as ProtoTimestamp } from "./generated/Timestamp_pb";
export interface Timestamp {
    seconds: number;
    nanos: number;
}
export declare function dateToTimestamp(dateOrMs: number | Date): Timestamp;
export declare function timestampToDate(timestamp: ProtoTimestamp): Date;
export declare function timestampToMs(timestamp: ProtoTimestamp): number;
export declare function timestampToProto({ seconds, nanos }: {
    seconds: number;
    nanos: number;
}): ProtoTimestamp;
