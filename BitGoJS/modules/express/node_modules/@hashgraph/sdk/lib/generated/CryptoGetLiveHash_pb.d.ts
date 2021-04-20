// package: proto
// file: CryptoGetLiveHash.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";
import * as CryptoAddLiveHash_pb from "./CryptoAddLiveHash_pb";

export class CryptoGetLiveHashQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetLiveHashQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetLiveHashQuery): CryptoGetLiveHashQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoGetLiveHashQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetLiveHashQuery;
  static deserializeBinaryFromReader(message: CryptoGetLiveHashQuery, reader: jspb.BinaryReader): CryptoGetLiveHashQuery;
}

export namespace CryptoGetLiveHashQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    accountid?: BasicTypes_pb.AccountID.AsObject,
    hash: Uint8Array | string,
  }
}

export class CryptoGetLiveHashResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasLivehash(): boolean;
  clearLivehash(): void;
  getLivehash(): CryptoAddLiveHash_pb.LiveHash | undefined;
  setLivehash(value?: CryptoAddLiveHash_pb.LiveHash): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetLiveHashResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetLiveHashResponse): CryptoGetLiveHashResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoGetLiveHashResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetLiveHashResponse;
  static deserializeBinaryFromReader(message: CryptoGetLiveHashResponse, reader: jspb.BinaryReader): CryptoGetLiveHashResponse;
}

export namespace CryptoGetLiveHashResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    livehash?: CryptoAddLiveHash_pb.LiveHash.AsObject,
  }
}

