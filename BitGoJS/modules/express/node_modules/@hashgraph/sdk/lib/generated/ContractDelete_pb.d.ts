// package: proto
// file: ContractDelete.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class ContractDeleteTransactionBody extends jspb.Message {
  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  hasTransferaccountid(): boolean;
  clearTransferaccountid(): void;
  getTransferaccountid(): BasicTypes_pb.AccountID | undefined;
  setTransferaccountid(value?: BasicTypes_pb.AccountID): void;

  hasTransfercontractid(): boolean;
  clearTransfercontractid(): void;
  getTransfercontractid(): BasicTypes_pb.ContractID | undefined;
  setTransfercontractid(value?: BasicTypes_pb.ContractID): void;

  getObtainersCase(): ContractDeleteTransactionBody.ObtainersCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractDeleteTransactionBody): ContractDeleteTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractDeleteTransactionBody;
  static deserializeBinaryFromReader(message: ContractDeleteTransactionBody, reader: jspb.BinaryReader): ContractDeleteTransactionBody;
}

export namespace ContractDeleteTransactionBody {
  export type AsObject = {
    contractid?: BasicTypes_pb.ContractID.AsObject,
    transferaccountid?: BasicTypes_pb.AccountID.AsObject,
    transfercontractid?: BasicTypes_pb.ContractID.AsObject,
  }

  export enum ObtainersCase {
    OBTAINERS_NOT_SET = 0,
    TRANSFERACCOUNTID = 2,
    TRANSFERCONTRACTID = 3,
  }
}

