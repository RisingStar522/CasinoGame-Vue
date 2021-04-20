// package: proto
// file: CryptoDeleteLiveHash.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class CryptoDeleteLiveHashTransactionBody extends jspb.Message {
  hasAccountoflivehash(): boolean;
  clearAccountoflivehash(): void;
  getAccountoflivehash(): BasicTypes_pb.AccountID | undefined;
  setAccountoflivehash(value?: BasicTypes_pb.AccountID): void;

  getLivehashtodelete(): Uint8Array | string;
  getLivehashtodelete_asU8(): Uint8Array;
  getLivehashtodelete_asB64(): string;
  setLivehashtodelete(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoDeleteLiveHashTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoDeleteLiveHashTransactionBody): CryptoDeleteLiveHashTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoDeleteLiveHashTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoDeleteLiveHashTransactionBody;
  static deserializeBinaryFromReader(message: CryptoDeleteLiveHashTransactionBody, reader: jspb.BinaryReader): CryptoDeleteLiveHashTransactionBody;
}

export namespace CryptoDeleteLiveHashTransactionBody {
  export type AsObject = {
    accountoflivehash?: BasicTypes_pb.AccountID.AsObject,
    livehashtodelete: Uint8Array | string,
  }
}

