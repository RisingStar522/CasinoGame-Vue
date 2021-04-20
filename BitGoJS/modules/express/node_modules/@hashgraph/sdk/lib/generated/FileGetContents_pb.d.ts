// package: proto
// file: FileGetContents.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class FileGetContentsQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetContentsQuery.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetContentsQuery): FileGetContentsQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileGetContentsQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetContentsQuery;
  static deserializeBinaryFromReader(message: FileGetContentsQuery, reader: jspb.BinaryReader): FileGetContentsQuery;
}

export namespace FileGetContentsQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    fileid?: BasicTypes_pb.FileID.AsObject,
  }
}

export class FileGetContentsResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasFilecontents(): boolean;
  clearFilecontents(): void;
  getFilecontents(): FileGetContentsResponse.FileContents | undefined;
  setFilecontents(value?: FileGetContentsResponse.FileContents): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGetContentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FileGetContentsResponse): FileGetContentsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileGetContentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGetContentsResponse;
  static deserializeBinaryFromReader(message: FileGetContentsResponse, reader: jspb.BinaryReader): FileGetContentsResponse;
}

export namespace FileGetContentsResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    filecontents?: FileGetContentsResponse.FileContents.AsObject,
  }

  export class FileContents extends jspb.Message {
    hasFileid(): boolean;
    clearFileid(): void;
    getFileid(): BasicTypes_pb.FileID | undefined;
    setFileid(value?: BasicTypes_pb.FileID): void;

    getContents(): Uint8Array | string;
    getContents_asU8(): Uint8Array;
    getContents_asB64(): string;
    setContents(value: Uint8Array | string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FileContents.AsObject;
    static toObject(includeInstance: boolean, msg: FileContents): FileContents.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FileContents, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FileContents;
    static deserializeBinaryFromReader(message: FileContents, reader: jspb.BinaryReader): FileContents;
  }

  export namespace FileContents {
    export type AsObject = {
      fileid?: BasicTypes_pb.FileID.AsObject,
      contents: Uint8Array | string,
    }
  }
}

