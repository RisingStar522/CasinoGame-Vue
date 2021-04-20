// package: proto
// file: FileAppend.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class FileAppendTransactionBody extends jspb.Message {
  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  getContents(): Uint8Array | string;
  getContents_asU8(): Uint8Array;
  getContents_asB64(): string;
  setContents(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileAppendTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileAppendTransactionBody): FileAppendTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileAppendTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileAppendTransactionBody;
  static deserializeBinaryFromReader(message: FileAppendTransactionBody, reader: jspb.BinaryReader): FileAppendTransactionBody;
}

export namespace FileAppendTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
    contents: Uint8Array | string,
  }
}

