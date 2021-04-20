// package: proto
// file: FileGetInfo.proto

import * as jspb from "google-protobuf";
import * as Timestamp_pb from "./Timestamp_pb";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class FileGetInfoQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetInfoQuery): FileGetInfoQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileGetInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetInfoQuery;
  static deserializeBinaryFromReader(message: FileGetInfoQuery, reader: jspb.BinaryReader): FileGetInfoQuery;
}

export namespace FileGetInfoQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    fileid?: BasicTypes_pb.FileID.AsObject,
  }
}

export class FileGetInfoResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasFileinfo(): boolean;
  clearFileinfo(): void;
  getFileinfo(): FileGetInfoResponse.FileInfo | undefined;
  setFileinfo(value?: FileGetInfoResponse.FileInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetInfoResponse): FileGetInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileGetInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetInfoResponse;
  static deserializeBinaryFromReader(message: FileGetInfoResponse, reader: jspb.BinaryReader): FileGetInfoResponse;
}

export namespace FileGetInfoResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    fileinfo?: FileGetInfoResponse.FileInfo.AsObject,
  }

  export class FileInfo extends jspb.Message {
    hasFileid(): boolean;
    clearFileid(): void;
    getFileid(): BasicTypes_pb.FileID | undefined;
    setFileid(value?: BasicTypes_pb.FileID): void;

    getSize(): number;
    setSize(value: number): void;

    hasExpirationtime(): boolean;
    clearExpirationtime(): void;
    getExpirationtime(): Timestamp_pb.Timestamp | undefined;
    setExpirationtime(value?: Timestamp_pb.Timestamp): void;

    getDeleted(): boolean;
    setDeleted(value: boolean): void;

    hasKeys(): boolean;
    clearKeys(): void;
    getKeys(): BasicTypes_pb.KeyList | undefined;
    setKeys(value?: BasicTypes_pb.KeyList): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileInfo.AsObject;
    static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileInfo;
    static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
  }

  export namespace FileInfo {
    export type AsObject = {
      fileid?: BasicTypes_pb.FileID.AsObject,
      size: number,
      expirationtime?: Timestamp_pb.Timestamp.AsObject,
      deleted: boolean,
      keys?: BasicTypes_pb.KeyList.AsObject,
    }
  }
}

