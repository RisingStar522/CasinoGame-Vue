// package: proto
// file: FileDelete.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class FileDeleteTransactionBody extends jspb.Message {
  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FileDeleteTransactionBody): FileDeleteTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileDeleteTransactionBody;
  static deserializeBinaryFromReader(message: FileDeleteTransactionBody, reader: jspb.BinaryReader): FileDeleteTransactionBody;
}

export namespace FileDeleteTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
  }
}

