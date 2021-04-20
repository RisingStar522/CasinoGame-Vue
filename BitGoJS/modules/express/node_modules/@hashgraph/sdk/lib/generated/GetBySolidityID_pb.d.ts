// package: proto
// file: GetBySolidityID.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class GetBySolidityIDQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  getSolidityid(): string;
  setSolidityid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBySolidityIDQuery.AsObject;
  static toObject(includeInstance: boolean, msg: GetBySolidityIDQuery): GetBySolidityIDQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBySolidityIDQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBySolidityIDQuery;
  static deserializeBinaryFromReader(message: GetBySolidityIDQuery, reader: jspb.BinaryReader): GetBySolidityIDQuery;
}

export namespace GetBySolidityIDQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    solidityid: string,
  }
}

export class GetBySolidityIDResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBySolidityIDResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBySolidityIDResponse): GetBySolidityIDResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetBySolidityIDResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBySolidityIDResponse;
  static deserializeBinaryFromReader(message: GetBySolidityIDResponse, reader: jspb.BinaryReader): GetBySolidityIDResponse;
}

export namespace GetBySolidityIDResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    accountid?: BasicTypes_pb.AccountID.AsObject,
    fileid?: BasicTypes_pb.FileID.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
  }
}

