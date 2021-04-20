// package: proto
// file: CryptoCreate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";

export class CryptoCreateTransactionBody extends jspb.Message {
  hasKey(): boolean;
  clearKey(): void;
  getKey(): BasicTypes_pb.Key | undefined;
  setKey(value?: BasicTypes_pb.Key): void;

  getInitialbalance(): string;
  setInitialbalance(value: string): void;

  hasProxyaccountid(): boolean;
  clearProxyaccountid(): void;
  getProxyaccountid(): BasicTypes_pb.AccountID | undefined;
  setProxyaccountid(value?: BasicTypes_pb.AccountID): void;

  getSendrecordthreshold(): string;
  setSendrecordthreshold(value: string): void;

  getReceiverecordthreshold(): string;
  setReceiverecordthreshold(value: string): void;

  getReceiversigrequired(): boolean;
  setReceiversigrequired(value: boolean): void;

  hasAutorenewperiod(): boolean;
  clearAutorenewperiod(): void;
  getAutorenewperiod(): Duration_pb.Duration | undefined;
  setAutorenewperiod(value?: Duration_pb.Duration): void;

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoCreateTransactionBody): CryptoCreateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoCreateTransactionBody;
  static deserializeBinaryFromReader(message: CryptoCreateTransactionBody, reader: jspb.BinaryReader): CryptoCreateTransactionBody;
}

export namespace CryptoCreateTransactionBody {
  export type AsObject = {
    key?: BasicTypes_pb.Key.AsObject,
    initialbalance: string,
    proxyaccountid?: BasicTypes_pb.AccountID.AsObject,
    sendrecordthreshold: string,
    receiverecordthreshold: string,
    receiversigrequired: boolean,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    shardid?: BasicTypes_pb.ShardID.AsObject,
    realmid?: BasicTypes_pb.RealmID.AsObject,
    newrealmadminkey?: BasicTypes_pb.Key.AsObject,
  }
}

