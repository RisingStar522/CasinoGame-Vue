// package: proto
// file: CryptoGetStakers.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class CryptoGetStakersQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetStakersQuery.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetStakersQuery): CryptoGetStakersQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoGetStakersQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetStakersQuery;
  static deserializeBinaryFromReader(message: CryptoGetStakersQuery, reader: jspb.BinaryReader): CryptoGetStakersQuery;
}

export namespace CryptoGetStakersQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    accountid?: BasicTypes_pb.AccountID.AsObject,
  }
}

export class ProxyStaker extends jspb.Message {
  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  getAmount(): string;
  setAmount(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProxyStaker.AsObject;
  static toObject(includeInstance: boolean, msg: ProxyStaker): ProxyStaker.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProxyStaker, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProxyStaker;
  static deserializeBinaryFromReader(message: ProxyStaker, reader: jspb.BinaryReader): ProxyStaker;
}

export namespace ProxyStaker {
  export type AsObject = {
    accountid?: BasicTypes_pb.AccountID.AsObject,
    amount: string,
  }
}

export class AllProxyStakers extends jspb.Message {
  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  clearProxystakerList(): void;
  getProxystakerList(): Array<ProxyStaker>;
  setProxystakerList(value: Array<ProxyStaker>): void;
  addProxystaker(value?: ProxyStaker, index?: number): ProxyStaker;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AllProxyStakers.AsObject;
  static toObject(includeInstance: boolean, msg: AllProxyStakers): AllProxyStakers.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AllProxyStakers, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AllProxyStakers;
  static deserializeBinaryFromReader(message: AllProxyStakers, reader: jspb.BinaryReader): AllProxyStakers;
}

export namespace AllProxyStakers {
  export type AsObject = {
    accountid?: BasicTypes_pb.AccountID.AsObject,
    proxystakerList: Array<ProxyStaker.AsObject>,
  }
}

export class CryptoGetStakersResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasStakers(): boolean;
  clearStakers(): void;
  getStakers(): AllProxyStakers | undefined;
  setStakers(value?: AllProxyStakers): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoGetStakersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoGetStakersResponse): CryptoGetStakersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoGetStakersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoGetStakersResponse;
  static deserializeBinaryFromReader(message: CryptoGetStakersResponse, reader: jspb.BinaryReader): CryptoGetStakersResponse;
}

export namespace CryptoGetStakersResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    stakers?: AllProxyStakers.AsObject,
  }
}

