// package: proto
// file: FileCreate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class FileCreateTransactionBody extends jspb.Message {
  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.Timestamp | undefined;
  setExpirationtime(value?: Timestamp_pb.Timestamp): void;

  hasKeys(): boolean;
  clearKeys(): void;
  getKeys(): BasicTypes_pb.KeyList | undefined;
  setKeys(value?: BasicTypes_pb.KeyList): void;

  getContents(): Uint8Array | string;
  getContents_asU8(): Uint8Array;
  getContents_asB64(): string;
  setContents(value: Uint8Array | string): void;

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
  toObject(includeInstance?: boolean): FileCreateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileCreateTransactionBody): FileCreateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileCreateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileCreateTransactionBody;
  static deserializeBinaryFromReader(message: FileCreateTransactionBody, reader: jspb.BinaryReader): FileCreateTransactionBody;
}

export namespace FileCreateTransactionBody {
  export type AsObject = {
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    keys?: BasicTypes_pb.KeyList.AsObject,
    contents: Uint8Array | string,
    shardid?: BasicTypes_pb.ShardID.AsObject,
    realmid?: BasicTypes_pb.RealmID.AsObject,
    newrealmadminkey?: BasicTypes_pb.Key.AsObject,
  }
}

