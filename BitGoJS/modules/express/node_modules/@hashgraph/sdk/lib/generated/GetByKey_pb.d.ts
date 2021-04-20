// package: proto
// file: GetByKey.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";
import * as CryptoAddLiveHash_pb from "./CryptoAddLiveHash_pb";

export class GetByKeyQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): BasicTypes_pb.Key | undefined;
  setKey(value?: BasicTypes_pb.Key): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByKeyQuery.AsObject;
  static toObject(includeInstance: boolean, msg: GetByKeyQuery): GetByKeyQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetByKeyQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByKeyQuery;
  static deserializeBinaryFromReader(message: GetByKeyQuery, reader: jspb.BinaryReader): GetByKeyQuery;
}

export namespace GetByKeyQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    key?: BasicTypes_pb.Key.AsObject,
  }
}

export class EntityID extends jspb.Message {
  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  hasLivehash(): boolean;
  clearLivehash(): void;
  getLivehash(): CryptoAddLiveHash_pb.LiveHash | undefined;
  setLivehash(value?: CryptoAddLiveHash_pb.LiveHash): void;

  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  getEntityCase(): EntityID.EntityCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntityID.AsObject;
  static toObject(includeInstance: boolean, msg: EntityID): EntityID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntityID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntityID;
  static deserializeBinaryFromReader(message: EntityID, reader: jspb.BinaryReader): EntityID;
}

export namespace EntityID {
  export type AsObject = {
    accountid?: BasicTypes_pb.AccountID.AsObject,
    livehash?: CryptoAddLiveHash_pb.LiveHash.AsObject,
    fileid?: BasicTypes_pb.FileID.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
  }

  export enum EntityCase {
    ENTITY_NOT_SET = 0,
    ACCOUNTID = 1,
    LIVEHASH = 2,
    FILEID = 3,
    CONTRACTID = 4,
  }
}

export class GetByKeyResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  clearEntitiesList(): void;
  getEntitiesList(): Array<EntityID>;
  setEntitiesList(value: Array<EntityID>): void;
  addEntities(value?: EntityID, index?: number): EntityID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetByKeyResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetByKeyResponse): GetByKeyResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetByKeyResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetByKeyResponse;
  static deserializeBinaryFromReader(message: GetByKeyResponse, reader: jspb.BinaryReader): GetByKeyResponse;
}

export namespace GetByKeyResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    entitiesList: Array<EntityID.AsObject>,
  }
}

