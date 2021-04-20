// package: proto
// file: ConsensusUpdateTopic.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class ConsensusUpdateTopicTransactionBody extends jspb.Message {
  hasTopicid(): boolean;
  clearTopicid(): void;
  getTopicid(): BasicTypes_pb.TopicID | undefined;
  setTopicid(value?: BasicTypes_pb.TopicID): void;

  hasMemo(): boolean;
  clearMemo(): void;
  getMemo(): google_protobuf_wrappers_pb.StringValue | undefined;
  setMemo(value?: google_protobuf_wrappers_pb.StringValue): void;

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
  toObject(includeInstance?: boolean): ConsensusUpdateTopicTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusUpdateTopicTransactionBody): ConsensusUpdateTopicTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusUpdateTopicTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusUpdateTopicTransactionBody;
  static deserializeBinaryFromReader(message: ConsensusUpdateTopicTransactionBody, reader: jspb.BinaryReader): ConsensusUpdateTopicTransactionBody;
}

export namespace ConsensusUpdateTopicTransactionBody {
  export type AsObject = {
    topicid?: BasicTypes_pb.TopicID.AsObject,
    memo?: google_protobuf_wrappers_pb.StringValue.AsObject,
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    adminkey?: BasicTypes_pb.Key.AsObject,
    submitkey?: BasicTypes_pb.Key.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    autorenewaccount?: BasicTypes_pb.AccountID.AsObject,
  }
}

