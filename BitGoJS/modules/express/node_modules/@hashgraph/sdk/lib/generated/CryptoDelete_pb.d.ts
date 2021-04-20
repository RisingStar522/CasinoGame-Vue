// package: proto
// file: CryptoDelete.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class CryptoDeleteTransactionBody extends jspb.Message {
  hasTransferaccountid(): boolean;
  clearTransferaccountid(): void;
  getTransferaccountid(): BasicTypes_pb.AccountID | undefined;
  setTransferaccountid(value?: BasicTypes_pb.AccountID): void;

  hasDeleteaccountid(): boolean;
  clearDeleteaccountid(): void;
  getDeleteaccountid(): BasicTypes_pb.AccountID | undefined;
  setDeleteaccountid(value?: BasicTypes_pb.AccountID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoDeleteTransactionBody): CryptoDeleteTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoDeleteTransactionBody;
  static deserializeBinaryFromReader(message: CryptoDeleteTransactionBody, reader: jspb.BinaryReader): CryptoDeleteTransactionBody;
}

export namespace CryptoDeleteTransactionBody {
  export type AsObject = {
    transferaccountid?: BasicTypes_pb.AccountID.AsObject,
    deleteaccountid?: BasicTypes_pb.AccountID.AsObject,
  }
}

