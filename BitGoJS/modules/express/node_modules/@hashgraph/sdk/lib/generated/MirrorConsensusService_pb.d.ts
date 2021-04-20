// package: com.hedera.mirror.api.proto
// file: MirrorConsensusService.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Timestamp_pb from "./Timestamp_pb";
import * as ConsensusSubmitMessage_pb from "./ConsensusSubmitMessage_pb";

export class ConsensusTopicQuery extends jspb.Message {
  hasTopicid(): boolean;
  clearTopicid(): void;
  getTopicid(): BasicTypes_pb.TopicID | undefined;
  setTopicid(value?: BasicTypes_pb.TopicID): void;

  hasConsensusstarttime(): boolean;
  clearConsensusstarttime(): void;
  getConsensusstarttime(): Timestamp_pb.Timestamp | undefined;
  setConsensusstarttime(value?: Timestamp_pb.Timestamp): void;

  hasConsensusendtime(): boolean;
  clearConsensusendtime(): void;
  getConsensusendtime(): Timestamp_pb.Timestamp | undefined;
  setConsensusendtime(value?: Timestamp_pb.Timestamp): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusTopicQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusTopicQuery): ConsensusTopicQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusTopicQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusTopicQuery;
  static deserializeBinaryFromReader(message: ConsensusTopicQuery, reader: jspb.BinaryReader): ConsensusTopicQuery;
}

export namespace ConsensusTopicQuery {
  export type AsObject = {
    topicid?: BasicTypes_pb.TopicID.AsObject,
    consensusstarttime?: Timestamp_pb.Timestamp.AsObject,
    consensusendtime?: Timestamp_pb.Timestamp.AsObject,
    limit: number,
  }
}

export class ConsensusTopicResponse extends jspb.Message {
  hasConsensustimestamp(): boolean;
  clearConsensustimestamp(): void;
  getConsensustimestamp(): Timestamp_pb.Timestamp | undefined;
  setConsensustimestamp(value?: Timestamp_pb.Timestamp): void;

  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  getRunninghash(): Uint8Array | string;
  getRunninghash_asU8(): Uint8Array;
  getRunninghash_asB64(): string;
  setRunninghash(value: Uint8Array | string): void;

  getSequencenumber(): number;
  setSequencenumber(value: number): void;

  getRunninghashversion(): number;
  setRunninghashversion(value: number): void;

  hasChunkinfo(): boolean;
  clearChunkinfo(): void;
  getChunkinfo(): ConsensusSubmitMessage_pb.ConsensusMessageChunkInfo | undefined;
  setChunkinfo(value?: ConsensusSubmitMessage_pb.ConsensusMessageChunkInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusTopicResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusTopicResponse): ConsensusTopicResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusTopicResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusTopicResponse;
  static deserializeBinaryFromReader(message: ConsensusTopicResponse, reader: jspb.BinaryReader): ConsensusTopicResponse;
}

export namespace ConsensusTopicResponse {
  export type AsObject = {
    consensustimestamp?: Timestamp_pb.Timestamp.AsObject,
    message: Uint8Array | string,
    runninghash: Uint8Array | string,
    sequencenumber: number,
    runninghashversion: number,
    chunkinfo?: ConsensusSubmitMessage_pb.ConsensusMessageChunkInfo.AsObject,
  }
}

