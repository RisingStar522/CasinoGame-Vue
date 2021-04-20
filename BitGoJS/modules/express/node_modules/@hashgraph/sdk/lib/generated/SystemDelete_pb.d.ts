// package: proto
// file: SystemDelete.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Timestamp_pb from "./Timestamp_pb";

export class SystemDeleteTransactionBody extends jspb.Message {
  hasFileid(): boolean;
  clearFileid(): void;
  getFileid(): BasicTypes_pb.FileID | undefined;
  setFileid(value?: BasicTypes_pb.FileID): void;

  hasContractid(): boolean;
  clearContractid(): void;
  getContractid(): BasicTypes_pb.ContractID | undefined;
  setContractid(value?: BasicTypes_pb.ContractID): void;

  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.TimestampSeconds | undefined;
  setExpirationtime(value?: Timestamp_pb.TimestampSeconds): void;

  getIdCase(): SystemDeleteTransactionBody.IdCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SystemDeleteTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: SystemDeleteTransactionBody): SystemDeleteTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SystemDeleteTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SystemDeleteTransactionBody;
  static deserializeBinaryFromReader(message: SystemDeleteTransactionBody, reader: jspb.BinaryReader): SystemDeleteTransactionBody;
}

export namespace SystemDeleteTransactionBody {
  export type AsObject = {
    fileid?: BasicTypes_pb.FileID.AsObject,
    contractid?: BasicTypes_pb.ContractID.AsObject,
    expirationtime?: Timestamp_pb.TimestampSeconds.AsObject,
  }

  export enum IdCase {
    ID_NOT_SET = 0,
    FILEID = 1,
    CONTRACTID = 2,
  }
}

