// package: proto
// file: ContractGetRecords.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as TransactionRecord_pb from "./TransactionRecord_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class ContractGetRecordsQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetRecordsQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetRecordsQuery): ContractGetRecordsQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractGetRecordsQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetRecordsQuery;
  static deserializeBinaryFromReader(message: ContractGetRecordsQuery, reader: jspb.BinaryReader): ContractGetRecordsQuery;
}

export namespace ContractGetRecordsQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
  }
}

export class ContractGetRecordsResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  clearRecordsList(): void;
  getRecordsList(): Array<TransactionRecord_pb.TransactionRecord>;
  setRecordsList(value: Array<TransactionRecord_pb.TransactionRecord>): void;
  addRecords(value?: TransactionRecord_pb.TransactionRecord, index?: number): TransactionRecord_pb.TransactionRecord;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetRecordsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetRecordsResponse): ContractGetRecordsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractGetRecordsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetRecordsResponse;
  static deserializeBinaryFromReader(message: ContractGetRecordsResponse, reader: jspb.BinaryReader): ContractGetRecordsResponse;
}

export namespace ContractGetRecordsResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
    recordsList: Array<TransactionRecord_pb.TransactionRecord.AsObject>,
  }
}

