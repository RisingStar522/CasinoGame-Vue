// package: proto
// file: ExchangeRate.proto

import * as jspb from "google-protobuf";
import * as Timestamp_pb from "./Timestamp_pb";

export class ExchangeRate extends jspb.Message {
  getHbarequiv(): number;
  setHbarequiv(value: number): void;

  getCentequiv(): number;
  setCentequiv(value: number): void;

  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.TimestampSeconds | undefined;
  setExpirationtime(value?: Timestamp_pb.TimestampSeconds): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRate.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRate): ExchangeRate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeRate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRate;
  static deserializeBinaryFromReader(message: ExchangeRate, reader: jspb.BinaryReader): ExchangeRate;
}

export namespace ExchangeRate {
  export type AsObject = {
    hbarequiv: number,
    centequiv: number,
    expirationtime?: Timestamp_pb.TimestampSeconds.AsObject,
  }
}

export class ExchangeRateSet extends jspb.Message {
  hasCurrentrate(): boolean;
  clearCurrentrate(): void;
  getCurrentrate(): ExchangeRate | undefined;
  setCurrentrate(value?: ExchangeRate): void;

  hasNextrate(): boolean;
  clearNextrate(): void;
  getNextrate(): ExchangeRate | undefined;
  setNextrate(value?: ExchangeRate): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExchangeRateSet.AsObject;
  static toObject(includeInstance: boolean, msg: ExchangeRateSet): ExchangeRateSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExchangeRateSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExchangeRateSet;
  static deserializeBinaryFromReader(message: ExchangeRateSet, reader: jspb.BinaryReader): ExchangeRateSet;
}

export namespace ExchangeRateSet {
  export type AsObject = {
    currentrate?: ExchangeRate.AsObject,
    nextrate?: ExchangeRate.AsObject,
  }
}

