// package: proto
// file: Freeze.proto

import * as jspb from "google-protobuf";
import * as Duration_pb from "./Duration_pb";
import * as Timestamp_pb from "./Timestamp_pb";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class FreezeTransactionBody extends jspb.Message {
  getStarthour(): number;
  setStarthour(value: number): void;

  getStartmin(): number;
  setStartmin(value: number): void;

  getEndhour(): number;
  setEndhour(value: number): void;

  getEndmin(): number;
  setEndmin(value: number): void;

  hasUpdatefile(): boolean;
  clearUpdatefile(): void;
  getUpdatefile(): BasicTypes_pb.FileID | undefined;
  setUpdatefile(value?: BasicTypes_pb.FileID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FreezeTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: FreezeTransactionBody): FreezeTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FreezeTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FreezeTransactionBody;
  static deserializeBinaryFromReader(message: FreezeTransactionBody, reader: jspb.BinaryReader): FreezeTransactionBody;
}

export namespace FreezeTransactionBody {
  export type AsObject = {
    starthour: number,
    startmin: number,
    endhour: number,
    endmin: number,
    updatefile?: BasicTypes_pb.FileID.AsObject,
  }
}

