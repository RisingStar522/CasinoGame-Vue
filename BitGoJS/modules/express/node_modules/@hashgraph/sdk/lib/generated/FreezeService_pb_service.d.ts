// package: proto
// file: FreezeService.proto

import * as FreezeService_pb from "./FreezeService_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Transaction_pb from "./Transaction_pb";
import {grpc} from "@improbable-eng/grpc-web";

type FreezeServicefreeze = {
  readonly methodName: string;
  readonly service: typeof FreezeService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

export class FreezeService {
  static readonly serviceName: string;
  static readonly freeze: FreezeServicefreeze;
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

export class FreezeServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  freeze(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  freeze(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
}

