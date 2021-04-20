// package: proto
// file: FileUpdate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class FileUpdateTransactionBody extends jspb.Message {
  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

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

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileUpdateTransactionBody): FileUpdateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileUpdateTransactionBody;
  static deserializeBinaryFromReader(message: FileUpdateTransactionBody, reader: jspb.BinaryReader): FileUpdateTransactionBody;
}

export namespace FileUpdateTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    keys?: BasicTypes_pb.KeyList.AsObject,
    contents: Uint8Array | string,
  }
}

