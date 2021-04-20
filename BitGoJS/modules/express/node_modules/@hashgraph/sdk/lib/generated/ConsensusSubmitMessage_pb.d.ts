// package: proto
// file: ConsensusSubmitMessage.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class ConsensusMessageChunkInfo extends jspb.Message {
  hasInitialtransactionid(): boolean;
  clearInitialtransactionid(): void;
  getInitialtransactionid(): BasicTypes_pb.TransactionID | undefined;
  setInitialtransactionid(value?: BasicTypes_pb.TransactionID): void;

  getTotal(): number;
  setTotal(value: number): void;

  getNumber(): number;
  setNumber(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusMessageChunkInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusMessageChunkInfo): ConsensusMessageChunkInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusMessageChunkInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusMessageChunkInfo;
  static deserializeBinaryFromReader(message: ConsensusMessageChunkInfo, reader: jspb.BinaryReader): ConsensusMessageChunkInfo;
}

export namespace ConsensusMessageChunkInfo {
  export type AsObject = {
    initialtransactionid?: BasicTypes_pb.TransactionID.AsObject,
    total: number,
    number: number,
  }
}

export class ConsensusSubmitMessageTransactionBody extends jspb.Message {
  hasTopicid(): boolean;
  clearTopicid(): void;
  getTopicid(): BasicTypes_pb.TopicID | undefined;
  setTopicid(value?: BasicTypes_pb.TopicID): void;

  getMessage(): Uint8Array | string;
  getMessage_asU8(): Uint8Array;
  getMessage_asB64(): string;
  setMessage(value: Uint8Array | string): void;

  hasChunkinfo(): boolean;
  clearChunkinfo(): void;
  getChunkinfo(): ConsensusMessageChunkInfo | undefined;
  setChunkinfo(value?: ConsensusMessageChunkInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusSubmitMessageTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusSubmitMessageTransactionBody): ConsensusSubmitMessageTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConsensusSubmitMessageTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusSubmitMessageTransactionBody;
  static deserializeBinaryFromReader(message: ConsensusSubmitMessageTransactionBody, reader: jspb.BinaryReader): ConsensusSubmitMessageTransactionBody;
}

export namespace ConsensusSubmitMessageTransactionBody {
  export type AsObject = {
    topicid?: BasicTypes_pb.TopicID.AsObject,
    message: Uint8Array | string,
    chunkinfo?: ConsensusMessageChunkInfo.AsObject,
  }
}

