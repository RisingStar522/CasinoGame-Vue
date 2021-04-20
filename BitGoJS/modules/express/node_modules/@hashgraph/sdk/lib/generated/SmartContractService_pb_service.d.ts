// package: proto
// file: SmartContractService.proto

import * as SmartContractService_pb from "./SmartContractService_pb";
import * as TransactionResponse_pb from "./TransactionResponse_pb";
import * as Query_pb from "./Query_pb";
import * as Response_pb from "./Response_pb";
import * as Transaction_pb from "./Transaction_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SmartContractServicecreateContract = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type SmartContractServiceupdateContract = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type SmartContractServicecontractCallMethod = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type SmartContractServicegetContractInfo = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type SmartContractServicecontractCallLocalMethod = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type SmartContractServiceContractGetBytecode = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type SmartContractServicegetBySolidityID = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type SmartContractServicegetTxRecordByContractID = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Query_pb.Query;
  readonly responseType: typeof Response_pb.Response;
};

type SmartContractServicedeleteContract = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type SmartContractServicesystemDelete = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

type SmartContractServicesystemUndelete = {
  readonly methodName: string;
  readonly service: typeof SmartContractService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof Transaction_pb.Transaction;
  readonly responseType: typeof TransactionResponse_pb.TransactionResponse;
};

export class SmartContractService {
  static readonly serviceName: string;
  static readonly createContract: SmartContractServicecreateContract;
  static readonly updateContract: SmartContractServiceupdateContract;
  static readonly contractCallMethod: SmartContractServicecontractCallMethod;
  static readonly getContractInfo: SmartContractServicegetContractInfo;
  static readonly contractCallLocalMethod: SmartContractServicecontractCallLocalMethod;
  static readonly ContractGetBytecode: SmartContractServiceContractGetBytecode;
  static readonly getBySolidityID: SmartContractServicegetBySolidityID;
  static readonly getTxRecordByContractID: SmartContractServicegetTxRecordByContractID;
  static readonly deleteContract: SmartContractServicedeleteContract;
  static readonly systemDelete: SmartContractServicesystemDelete;
  static readonly systemUndelete: SmartContractServicesystemUndelete;
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

export class SmartContractServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createContract(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  createContract(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  updateContract(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  updateContract(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  contractCallMethod(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  contractCallMethod(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  getContractInfo(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getContractInfo(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  contractCallLocalMethod(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  contractCallLocalMethod(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  contractGetBytecode(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  contractGetBytecode(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getBySolidityID(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getBySolidityID(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getTxRecordByContractID(
    requestMessage: Query_pb.Query,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  getTxRecordByContractID(
    requestMessage: Query_pb.Query,
    callback: (error: ServiceError|null, responseMessage: Response_pb.Response|null) => void
  ): UnaryResponse;
  deleteContract(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  deleteContract(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  systemDelete(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  systemDelete(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  systemUndelete(
    requestMessage: Transaction_pb.Transaction,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
  systemUndelete(
    requestMessage: Transaction_pb.Transaction,
    callback: (error: ServiceError|null, responseMessage: TransactionResponse_pb.TransactionResponse|null) => void
  ): UnaryResponse;
}

