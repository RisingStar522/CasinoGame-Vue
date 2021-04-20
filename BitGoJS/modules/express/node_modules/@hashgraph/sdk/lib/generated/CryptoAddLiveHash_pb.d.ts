// package: proto
// file: CryptoAddLiveHash.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";

export class LiveHash extends jspb.Message {
  hasAccountid(): boolean;
  clearAccountid(): void;
  getAccountid(): BasicTypes_pb.AccountID | undefined;
  setAccountid(value?: BasicTypes_pb.AccountID): void;

  getHash(): Uint8Array | string;
  getHash_asU8(): Uint8Array;
  getHash_asB64(): string;
  setHash(value: Uint8Array | string): void;

  hasKeys(): boolean;
  clearKeys(): void;
  getKeys(): BasicTypes_pb.KeyList | undefined;
  setKeys(value?: BasicTypes_pb.KeyList): void;

  hasDuration(): boolean;
  clearDuration(): void;
  getDuration(): Duration_pb.Duration | undefined;
  setDuration(value?: Duration_pb.Duration): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LiveHash.AsObject;
  static toObject(includeInstance: boolean, msg: LiveHash): LiveHash.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LiveHash, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LiveHash;
  static deserializeBinaryFromReader(message: LiveHash, reader: jspb.BinaryReader): LiveHash;
}

export namespace LiveHash {
  export type AsObject = {
    accountid?: BasicTypes_pb.AccountID.AsObject,
    hash: Uint8Array | string,
    keys?: BasicTypes_pb.KeyList.AsObject,
    duration?: Duration_pb.Duration.AsObject,
  }
}

export class CryptoAddLiveHashTransactionBody extends jspb.Message {
  hasLivehash(): boolean;
  clearLivehash(): void;
  getLivehash(): LiveHash | undefined;
  setLivehash(value?: LiveHash): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoAddLiveHashTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoAddLiveHashTransactionBody): CryptoAddLiveHashTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoAddLiveHashTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoAddLiveHashTransactionBody;
  static deserializeBinaryFromReader(message: CryptoAddLiveHashTransactionBody, reader: jspb.BinaryReader): CryptoAddLiveHashTransactionBody;
}

export namespace CryptoAddLiveHashTransactionBody {
  export type AsObject = {
    livehash?: LiveHash.AsObject,
  }
}

