// package: proto
// file: ContractCall.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";

export class ContractCallTransactionBody extends jspb.Message {
  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  getGas(): string;
  setGas(value: string): void;

  getAmount(): string;
  setAmount(value: string): void;

  getFunctionparameters(): Uint8Array | string;
  getFunctionparameters_asU8(): Uint8Array;
  getFunctionparameters_asB64(): string;
  setFunctionparameters(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractCallTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: ContractCallTransactionBody): ContractCallTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractCallTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractCallTransactionBody;
  static deserializeBinaryFromReader(message: ContractCallTransactionBody, reader: jspb.BinaryReader): ContractCallTransactionBody;
}

export namespace ContractCallTransactionBody {
  export type AsObject = {
    contractid?: BasicTypes_pb.ContractID.AsObject,
    gas: string,
    amount: string,
    functionparameters: Uint8Array | string,
  }
}

