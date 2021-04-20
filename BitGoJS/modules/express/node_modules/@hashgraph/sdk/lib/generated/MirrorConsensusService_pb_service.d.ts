// package: com.hedera.mirror.api.proto
// file: MirrorConsensusService.proto

import * as MirrorConsensusService_pb from "./MirrorConsensusService_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ConsensusServicesubscribeTopic = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof MirrorConsensusService_pb.ConsensusTopicQuery;
  readonly responseType: typeof MirrorConsensusService_pb.ConsensusTopicResponse;
};

export class ConsensusService {
  static readonly serviceName: string;
  static readonly subscribeTopic: ConsensusServicesubscribeTopic;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ConsensusServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  subscribeTopic(requestMessage: MirrorConsensusService_pb.ConsensusTopicQuery, metadata?: grpc.Metadata): ResponseStream<MirrorConsensusService_pb.ConsensusTopicResponse>;
}

