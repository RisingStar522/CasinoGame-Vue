// package: proto
// file: ContractCreate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";

export class ContractCreateTransactionBody extends jspb.Message {
  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  hasAdminkey(): boolean;
  clearAdminkey(): void;
  getAdminkey(): BasicTypes_pb.Key | undefined;
  setAdminkey(value?: BasicTypes_pb.Key): void;

  getGas(): string;
  setGas(value: string): void;

  getInitialbalance(): string;
  setInitialbalance(value: string): void;

  hasProxyaccountid(): boolean;
  clearProxyaccountid(): void;
  getProxyaccountid(): BasicTypes_pb.AccountID | undefined;
  setProxyaccountid(value?: BasicTypes_pb.AccountID): void;

  hasAutorenewperiod(): boolean;
  clearAutorenewperiod(): void;
  getAutorenewperiod(): Duration_pb.Duration | undefined;
  setAutorenewperiod(value?: Duration_pb.Duration): void;

  getConstructorparameters(): Uint8Array | string;
  getConstructorparameters_asU8(): Uint8Array;
  getConstructorparameters_asB64(): string;
  setConstructorparameters(value: Uint8Array | string): void;

  hasShardid(): boolean;
  clearShardid(): void;
  getShardid(): BasicTypes_pb.ShardID | undefined;
  setShardid(value?: BasicTypes_pb.ShardID): void;

  hasRealmid(): boolean;
  clearRealmid(): void;
  getRealmid(): BasicTypes_pb.RealmID | undefined;
  setRealmid(value?: BasicTypes_pb.RealmID): void;

  hasNewrealmadminkey(): boolean;
  clearNewrealmadminkey(): void;
  getNewrealmadminkey(): BasicTypes_pb.Key | undefined;
  setNewrealmadminkey(value?: BasicTypes_pb.Key): void;

  getMemo(): string;
  setMemo(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCreateTransactionBody): ContractCreateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCreateTransactionBody;
  static deserializeBinaryFromReader(message: ContractCreateTransactionBody, reader: jspb.BinaryReader): ContractCreateTransactionBody;
}

export namespace ContractCreateTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
    adminkey?: BasicTypes_pb.Key.AsObject,
    gas: string,
    initialbalance: string,
    proxyaccountid?: BasicTypes_pb.AccountID.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    constructorparameters: Uint8Array | string,
    shardid?: BasicTypes_pb.ShardID.AsObject,
    realmid?: BasicTypes_pb.RealmID.AsObject,
    newrealmadminkey?: BasicTypes_pb.Key.AsObject,
    memo: string,
  }
}

