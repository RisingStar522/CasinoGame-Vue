// package: proto
// file: ContractUpdate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class ContractUpdateTransactionBody extends jspb.Message {
  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.Timestamp | undefined;
  setExpirationtime(value?: Timestamp_pb.Timestamp): void;

  hasAdminkey(): boolean;
  clearAdminkey(): void;
  getAdminkey(): BasicTypes_pb.Key | undefined;
  setAdminkey(value?: BasicTypes_pb.Key): void;

  hasProxyaccountid(): boolean;
  clearProxyaccountid(): void;
  getProxyaccountid(): BasicTypes_pb.AccountID | undefined;
  setProxyaccountid(value?: BasicTypes_pb.AccountID): void;

  hasAutorenewperiod(): boolean;
  clearAutorenewperiod(): void;
  getAutorenewperiod(): Duration_pb.Duration | undefined;
  setAutorenewperiod(value?: Duration_pb.Duration): void;

  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  getMemo(): string;
  setMemo(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractUpdateTransactionBody): ContractUpdateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractUpdateTransactionBody;
  static deserializeBinaryFromReader(message: ContractUpdateTransactionBody, reader: jspb.BinaryReader): ContractUpdateTransactionBody;
}

export namespace ContractUpdateTransactionBody {
  export type AsObject = {
    contractid?: BasicTypes_pb.ContractID.AsObject,
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    adminkey?: BasicTypes_pb.Key.AsObject,
    proxyaccountid?: BasicTypes_pb.AccountID.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    fileid?: BasicTypes_pb.FileID.AsObject,
    memo: string,
  }
}

