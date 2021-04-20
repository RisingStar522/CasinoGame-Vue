// package: proto
// file: ConsensusGetTopicInfo.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";
import * as ConsensusTopicInfo_pb from "./ConsensusTopicInfo_pb";

export class ConsensusGetTopicInfoQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasTopicid(): boolean;
  clearTopicid(): void;
  getTopicid(): BasicTypes_pb.TopicID | undefined;
  setTopicid(value?: BasicTypes_pb.TopicID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusGetTopicInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusGetTopicInfoQuery): ConsensusGetTopicInfoQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusGetTopicInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusGetTopicInfoQuery;
  static deserializeBinaryFromReader(message: ConsensusGetTopicInfoQuery, reader: jspb.BinaryReader): ConsensusGetTopicInfoQuery;
}

export namespace ConsensusGetTopicInfoQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    topicid?: BasicTypes_pb.TopicID.AsObject,
  }
}

export class ConsensusGetTopicInfoResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasTopicid(): boolean;
  clearTopicid(): void;
  getTopicid(): BasicTypes_pb.TopicID | undefined;
  setTopicid(value?: BasicTypes_pb.TopicID): void;

  hasTopicinfo(): boolean;
  clearTopicinfo(): void;
  getTopicinfo(): ConsensusTopicInfo_pb.ConsensusTopicInfo | undefined;
  setTopicinfo(value?: ConsensusTopicInfo_pb.ConsensusTopicInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusGetTopicInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusGetTopicInfoResponse): ConsensusGetTopicInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusGetTopicInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusGetTopicInfoResponse;
  static deserializeBinaryFromReader(message: ConsensusGetTopicInfoResponse, reader: jspb.BinaryReader): ConsensusGetTopicInfoResponse;
}

export namespace ConsensusGetTopicInfoResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    topicid?: BasicTypes_pb.TopicID.AsObject,
    topicinfo?: ConsensusTopicInfo_pb.ConsensusTopicInfo.AsObject,
  }
}

