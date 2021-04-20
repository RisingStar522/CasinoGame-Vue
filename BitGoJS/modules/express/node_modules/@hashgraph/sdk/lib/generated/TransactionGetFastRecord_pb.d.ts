// package: proto
// file: TransactionGetFastRecord.proto

import * as jspb from "google-protobuf";
import * as TransactionRecord_pb from "./TransactionRecord_pb";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class TransactionGetFastRecordQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasTransactionid(): boolean;
  clearTransactionid(): void;
  getTransactionid(): BasicTypes_pb.TransactionID | undefined;
  setTransactionid(value?: BasicTypes_pb.TransactionID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetFastRecordQuery.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetFastRecordQuery): TransactionGetFastRecordQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionGetFastRecordQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetFastRecordQuery;
  static deserializeBinaryFromReader(message: TransactionGetFastRecordQuery, reader: jspb.BinaryReader): TransactionGetFastRecordQuery;
}

export namespace TransactionGetFastRecordQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    transactionid?: BasicTypes_pb.TransactionID.AsObject,
  }
}

export class TransactionGetFastRecordResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasTransactionrecord(): boolean;
  clearTransactionrecord(): void;
  getTransactionrecord(): TransactionRecord_pb.TransactionRecord | undefined;
  setTransactionrecord(value?: TransactionRecord_pb.TransactionRecord): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionGetFastRecordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionGetFastRecordResponse): TransactionGetFastRecordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TransactionGetFastRecordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionGetFastRecordResponse;
  static deserializeBinaryFromReader(message: TransactionGetFastRecordResponse, reader: jspb.BinaryReader): TransactionGetFastRecordResponse;
}

export namespace TransactionGetFastRecordResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    transactionrecord?: TransactionRecord_pb.TransactionRecord.AsObject,
  }
}

