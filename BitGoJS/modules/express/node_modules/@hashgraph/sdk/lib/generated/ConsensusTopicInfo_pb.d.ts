// package: proto
// file: ConsensusTopicInfo.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class ConsensusTopicInfo extends jspb.Message {
  getMemo(): string;
  setMemo(value: string): void;

  getRunninghash(): Uint8Array | string;
  getRunninghash_asU8(): Uint8Array;
  getRunninghash_asB64(): string;
  setRunninghash(value: Uint8Array | string): void;

  getSequencenumber(): number;
  setSequencenumber(value: number): void;

  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.Timestamp | undefined;
  setExpirationtime(value?: Timestamp_pb.Timestamp): void;

  hasAdminkey(): boolean;
  clearAdminkey(): void;
  getAdminkey(): BasicTypes_pb.Key | undefined;
  setAdminkey(value?: BasicTypes_pb.Key): void;

  hasSubmitkey(): boolean;
  clearSubmitkey(): void;
  getSubmitkey(): BasicTypes_pb.Key | undefined;
  setSubmitkey(value?: BasicTypes_pb.Key): void;

  hasAutorenewperiod(): boolean;
  clearAutorenewperiod(): void;
  getAutorenewperiod(): Duration_pb.Duration | undefined;
  setAutorenewperiod(value?: Duration_pb.Duration): void;

  hasAutorenewaccount(): boolean;
  clearAutorenewaccount(): void;
  getAutorenewaccount(): BasicTypes_pb.AccountID | undefined;
  setAutorenewaccount(value?: BasicTypes_pb.AccountID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusTopicInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusTopicInfo): ConsensusTopicInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusTopicInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusTopicInfo;
  static deserializeBinaryFromReader(message: ConsensusTopicInfo, reader: jspb.BinaryReader): ConsensusTopicInfo;
}

export namespace ConsensusTopicInfo {
  export type AsObject = {
    memo: string,
    runninghash: Uint8Array | string,
    sequencenumber: number,
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    adminkey?: BasicTypes_pb.Key.AsObject,
    submitkey?: BasicTypes_pb.Key.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    autorenewaccount?: BasicTypes_pb.AccountID.AsObject,
  }
}

