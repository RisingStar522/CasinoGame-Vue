// package: proto
// file: ContractCallLocal.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class ContractLoginfo extends jspb.Message {
  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  getBloom(): Uint8Array | string;
  getBloom_asU8(): Uint8Array;
  getBloom_asB64(): string;
  setBloom(value: Uint8Array | string): void;

  clearTopicList(): void;
  getTopicList(): Array<Uint8Array | string>;
  getTopicList_asU8(): Array<Uint8Array>;
  getTopicList_asB64(): Array<string>;
  setTopicList(value: Array<Uint8Array | string>): void;
  addTopic(value: Uint8Array | string, index?: number): Uint8Array | string;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractLoginfo.AsObject;
  static toObject(includeInstance: boolean, msg: ContractLoginfo): ContractLoginfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractLoginfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractLoginfo;
  static deserializeBinaryFromReader(message: ContractLoginfo, reader: jspb.BinaryReader): ContractLoginfo;
}

export namespace ContractLoginfo {
  export type AsObject = {
    contractid?: BasicTypes_pb.ContractID.AsObject,
    bloom: Uint8Array | string,
    topicList: Array<Uint8Array | string>,
    data: Uint8Array | string,
  }
}

export class ContractFunctionResult extends jspb.Message {
  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  getContractcallresult(): Uint8Array | string;
  getContractcallresult_asU8(): Uint8Array;
  getContractcallresult_asB64(): string;
  setContractcallresult(value: Uint8Array | string): void;

  getErrormessage(): string;
  setErrormessage(value: string): void;

  getBloom(): Uint8Array | string;
  getBloom_asU8(): Uint8Array;
  getBloom_asB64(): string;
  setBloom(value: Uint8Array | string): void;

  getGasused(): number;
  setGasused(value: number): void;

  clearLoginfoList(): void;
  getLoginfoList(): Array<ContractLoginfo>;
  setLoginfoList(value: Array<ContractLoginfo>): void;
  addLoginfo(value?: ContractLoginfo, index?: number): ContractLoginfo;

  clearCreatedcontractidsList(): void;
  getCreatedcontractidsList(): Array<BasicTypes_pb.ContractID>;
  setCreatedcontractidsList(value: Array<BasicTypes_pb.ContractID>): void;
  addCreatedcontractids(value?: BasicTypes_pb.ContractID, index?: number): BasicTypes_pb.ContractID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractFunctionResult.AsObject;
  static toObject(includeInstance: boolean, msg: ContractFunctionResult): ContractFunctionResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractFunctionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractFunctionResult;
  static deserializeBinaryFromReader(message: ContractFunctionResult, reader: jspb.BinaryReader): ContractFunctionResult;
}

export namespace ContractFunctionResult {
  export type AsObject = {
    contractid?: BasicTypes_pb.ContractID.AsObject,
    contractcallresult: Uint8Array | string,
    errormessage: string,
    bloom: Uint8Array | string,
    gasused: number,
    loginfoList: Array<ContractLoginfo.AsObject>,
    createdcontractidsList: Array<BasicTypes_pb.ContractID.AsObject>,
  }
}

export class ContractCallLocalQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  getGas(): number;
  setGas(value: number): void;

  getFunctionparameters(): Uint8Array | string;
  getFunctionparameters_asU8(): Uint8Array;
  getFunctionparameters_asB64(): string;
  setFunctionparameters(value: Uint8Array | string): void;

  getMaxresultsize(): number;
  setMaxresultsize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallLocalQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallLocalQuery): ContractCallLocalQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractCallLocalQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallLocalQuery;
  static deserializeBinaryFromReader(message: ContractCallLocalQuery, reader: jspb.BinaryReader): ContractCallLocalQuery;
}

export namespace ContractCallLocalQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
    gas: number,
    functionparameters: Uint8Array | string,
    maxresultsize: number,
  }
}

export class ContractCallLocalResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasFunctionresult(): boolean;
  clearFunctionresult(): void;
  getFunctionresult(): ContractFunctionResult | undefined;
  setFunctionresult(value?: ContractFunctionResult): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallLocalResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallLocalResponse): ContractCallLocalResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractCallLocalResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallLocalResponse;
  static deserializeBinaryFromReader(message: ContractCallLocalResponse, reader: jspb.BinaryReader): ContractCallLocalResponse;
}

export namespace ContractCallLocalResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    functionresult?: ContractFunctionResult.AsObject,
  }
}

