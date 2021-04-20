// package: proto
// file: ContractGetInfo.proto

import * as jspb from "google-protobuf";
import * as Timestamp_pb from "./Timestamp_pb";
import * as Duration_pb from "./Duration_pb";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as QueryHeader_pb from "./QueryHeader_pb";
import * as ResponseHeader_pb from "./ResponseHeader_pb";

export class ContractGetInfoQuery extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): QueryHeader_pb.QueryHeader | undefined;
  setHeader(value?: QueryHeader_pb.QueryHeader): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetInfoQuery.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetInfoQuery): ContractGetInfoQuery.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractGetInfoQuery, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetInfoQuery;
  static deserializeBinaryFromReader(message: ContractGetInfoQuery, reader: jspb.BinaryReader): ContractGetInfoQuery;
}

export namespace ContractGetInfoQuery {
  export type AsObject = {
    header?: QueryHeader_pb.QueryHeader.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
  }
}

export class ContractGetInfoResponse extends jspb.Message {
  hasHeader(): boolean;
  clearHeader(): void;
  getHeader(): ResponseHeader_pb.ResponseHeader | undefined;
  setHeader(value?: ResponseHeader_pb.ResponseHeader): void;

  hasContractinfo(): boolean;
  clearContractinfo(): void;
  getContractinfo(): ContractGetInfoResponse.ContractInfo | undefined;
  setContractinfo(value?: ContractGetInfoResponse.ContractInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractGetInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ContractGetInfoResponse): ContractGetInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractGetInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractGetInfoResponse;
  static deserializeBinaryFromReader(message: ContractGetInfoResponse, reader: jspb.BinaryReader): ContractGetInfoResponse;
}

export namespace ContractGetInfoResponse {
  export type AsObject = {
    header?: ResponseHeader_pb.ResponseHeader.AsObject,
    contractinfo?: ContractGetInfoResponse.ContractInfo.AsObject,
  }

  export class ContractInfo extends jspb.Message {
    hasContractid(): boolean;
    clearContractid(): void;
    getContractid(): BasicTypes_pb.ContractID | undefined;
    setContractid(value?: BasicTypes_pb.ContractID): void;

    hasAccountid(): boolean;
    clearAccountid(): void;
    getAccountid(): BasicTypes_pb.AccountID | undefined;
    setAccountid(value?: BasicTypes_pb.AccountID): void;

    getContractaccountid(): string;
    setContractaccountid(value: string): void;

    hasAdminkey(): boolean;
    clearAdminkey(): void;
    getAdminkey(): BasicTypes_pb.Key | undefined;
    setAdminkey(value?: BasicTypes_pb.Key): void;

    hasExpirationtime(): boolean;
    clearExpirationtime(): void;
    getExpirationtime(): Timestamp_pb.Timestamp | undefined;
    setExpirationtime(value?: Timestamp_pb.Timestamp): void;

    hasAutorenewperiod(): boolean;
    clearAutorenewperiod(): void;
    getAutorenewperiod(): Duration_pb.Duration | undefined;
    setAutorenewperiod(value?: Duration_pb.Duration): void;

    getStorage(): number;
    setStorage(value: number): void;

    getMemo(): string;
    setMemo(value: string): void;

    getBalance(): string;
    setBalance(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContractInfo.AsObject;
    static toObject(includeInstance: boolean, msg: ContractInfo): ContractInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContractInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContractInfo;
    static deserializeBinaryFromReader(message: ContractInfo, reader: jspb.BinaryReader): ContractInfo;
  }

  export namespace ContractInfo {
    export type AsObject = {
      contractid?: BasicTypes_pb.ContractID.AsObject,
      accountid?: BasicTypes_pb.AccountID.AsObject,
      contractaccountid: string,
      adminkey?: BasicTypes_pb.Key.AsObject,
      expirationtime?: Timestamp_pb.Timestamp.AsObject,
      autorenewperiod?: Duration_pb.Duration.AsObject,
      storage: number,
      memo: string,
      balance: string,
    }
  }
}

