// package: proto
// file: NetworkGetVersionInfo.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class NetworkGetVersionInfoQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkGetVersionInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkGetVersionInfoQuery): NetworkGetVersionInfoQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NetworkGetVersionInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkGetVersionInfoQuery;
  static deserializeBinaryFromReader(message: NetworkGetVersionInfoQuery, reader: jspb.BinaryReader): NetworkGetVersionInfoQuery;
}

export namespace NetworkGetVersionInfoQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
  }
}

export class NetworkGetVersionInfoResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasHapiprotoversion(): boolean;
  clearHapiprotoversion(): void;
  getHapiprotoversion(): BasicTypes_pb.SemanticVersion | undefined;
  setHapiprotoversion(value?: BasicTypes_pb.SemanticVersion): void;

  hasHederaservicesversion(): boolean;
  clearHederaservicesversion(): void;
  getHederaservicesversion(): BasicTypes_pb.SemanticVersion | undefined;
  setHederaservicesversion(value?: BasicTypes_pb.SemanticVersion): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkGetVersionInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkGetVersionInfoResponse): NetworkGetVersionInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NetworkGetVersionInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkGetVersionInfoResponse;
  static deserializeBinaryFromReader(message: NetworkGetVersionInfoResponse, reader: jspb.BinaryReader): NetworkGetVersionInfoResponse;
}

export namespace NetworkGetVersionInfoResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    hapiprotoversion?: BasicTypes_pb.SemanticVersion.AsObject,
    hederaservicesversion?: BasicTypes_pb.SemanticVersion.AsObject,
  }
}

