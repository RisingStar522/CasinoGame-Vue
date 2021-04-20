// package: proto
// file: ConsensusService.proto

import * as ConsensusService_pb from "./ConsensusService_pb";
import * as Query_pb from "./Query_pb";
import * as Response_pb from "./Response_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Transaction_pb from "./Transaction_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ConsensusServicecreateTopic = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type ConsensusServiceupdateTopic = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type ConsensusServicedeleteTopic = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type ConsensusServicegetTopicInfo = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type ConsensusServicesubmitMessage = {
  readonly methodName: string;
  readonly service: typeof ConsensusService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

export class ConsensusService {
  static readonly serviceName: string;
  static readonly createTopic: ConsensusServicecreateTopic;
  static readonly updateTopic: ConsensusServiceupdateTopic;
  static readonly deleteTopic: ConsensusServicedeleteTopic;
  static readonly getTopicInfo: ConsensusServicegetTopicInfo;
  static readonly submitMessage: ConsensusServicesubmitMessage;
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
  createTopic(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  createTopic(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  updateTopic(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  updateTopic(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  deleteTopic(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  deleteTopic(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  getTopicInfo(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getTopicInfo(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  submitMessage(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  submitMessage(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
}

