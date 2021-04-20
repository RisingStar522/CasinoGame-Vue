// package: proto
// file: ConsensusCreateTopic.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";

export class ConsensusCreateTopicTransactionBody extends jspb.Message {
  getMemo(): string;
  setMemo(value: string): void;

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
  toObject(includeInstance?: boolean): ConsensusCreateTopicTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusCreateTopicTransactionBody): ConsensusCreateTopicTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusCreateTopicTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusCreateTopicTransactionBody;
  static deserializeBinaryFromReader(message: ConsensusCreateTopicTransactionBody, reader: jspb.BinaryReader): ConsensusCreateTopicTransactionBody;
}

export namespace ConsensusCreateTopicTransactionBody {
  export type AsObject = {
    memo: string,
    adminkey?: BasicTypes_pb.Key.AsObject,
    submitkey?: BasicTypes_pb.Key.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    autorenewaccount?: BasicTypes_pb.AccountID.AsObject,
  }
}

