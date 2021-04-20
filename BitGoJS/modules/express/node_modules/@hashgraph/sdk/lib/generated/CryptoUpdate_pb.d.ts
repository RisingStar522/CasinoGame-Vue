// package: proto
// file: CryptoUpdate.proto

import * as jspb from "google-protobuf";
import * as BasicTypes_pb from "./BasicTypes_pb";
import * as Duration_pb from "./Duration_pb";
import * as Timestamp_pb from "./Timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class CryptoUpdateTransactionBody extends jspb.Message {
  hasAccountidtoupdate(): boolean;
  clearAccountidtoupdate(): void;
  getAccountidtoupdate(): BasicTypes_pb.AccountID | undefined;
  setAccountidtoupdate(value?: BasicTypes_pb.AccountID): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): BasicTypes_pb.Key | undefined;
  setKey(value?: BasicTypes_pb.Key): void;

  hasProxyaccountid(): boolean;
  clearProxyaccountid(): void;
  getProxyaccountid(): BasicTypes_pb.AccountID | undefined;
  setProxyaccountid(value?: BasicTypes_pb.AccountID): void;

  getProxyfraction(): number;
  setProxyfraction(value: number): void;

  hasSendrecordthreshold(): boolean;
  clearSendrecordthreshold(): void;
  getSendrecordthreshold(): number;
  setSendrecordthreshold(value: number): void;

  hasSendrecordthresholdwrapper(): boolean;
  clearSendrecordthresholdwrapper(): void;
  getSendrecordthresholdwrapper(): google_protobuf_wrappers_pb.UInt64Value | undefined;
  setSendrecordthresholdwrapper(value?: google_protobuf_wrappers_pb.UInt64Value): void;

  hasReceiverecordthreshold(): boolean;
  clearReceiverecordthreshold(): void;
  getReceiverecordthreshold(): number;
  setReceiverecordthreshold(value: number): void;

  hasReceiverecordthresholdwrapper(): boolean;
  clearReceiverecordthresholdwrapper(): void;
  getReceiverecordthresholdwrapper(): google_protobuf_wrappers_pb.UInt64Value | undefined;
  setReceiverecordthresholdwrapper(value?: google_protobuf_wrappers_pb.UInt64Value): void;

  hasAutorenewperiod(): boolean;
  clearAutorenewperiod(): void;
  getAutorenewperiod(): Duration_pb.Duration | undefined;
  setAutorenewperiod(value?: Duration_pb.Duration): void;

  hasExpirationtime(): boolean;
  clearExpirationtime(): void;
  getExpirationtime(): Timestamp_pb.Timestamp | undefined;
  setExpirationtime(value?: Timestamp_pb.Timestamp): void;

  hasReceiversigrequired(): boolean;
  clearReceiversigrequired(): void;
  getReceiversigrequired(): boolean;
  setReceiversigrequired(value: boolean): void;

  hasReceiversigrequiredwrapper(): boolean;
  clearReceiversigrequiredwrapper(): void;
  getReceiversigrequiredwrapper(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setReceiversigrequiredwrapper(value?: google_protobuf_wrappers_pb.BoolValue): void;

  getSendrecordthresholdfieldCase(): CryptoUpdateTransactionBody.SendrecordthresholdfieldCase;
  getReceiverecordthresholdfieldCase(): CryptoUpdateTransactionBody.ReceiverecordthresholdfieldCase;
  getReceiversigrequiredfieldCase(): CryptoUpdateTransactionBody.ReceiversigrequiredfieldCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoUpdateTransactionBody.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoUpdateTransactionBody): CryptoUpdateTransactionBody.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CryptoUpdateTransactionBody, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoUpdateTransactionBody;
  static deserializeBinaryFromReader(message: CryptoUpdateTransactionBody, reader: jspb.BinaryReader): CryptoUpdateTransactionBody;
}

export namespace CryptoUpdateTransactionBody {
  export type AsObject = {
    accountidtoupdate?: BasicTypes_pb.AccountID.AsObject,
    key?: BasicTypes_pb.Key.AsObject,
    proxyaccountid?: BasicTypes_pb.AccountID.AsObject,
    proxyfraction: number,
    sendrecordthreshold: number,
    sendrecordthresholdwrapper?: google_protobuf_wrappers_pb.UInt64Value.AsObject,
    receiverecordthreshold: number,
    receiverecordthresholdwrapper?: google_protobuf_wrappers_pb.UInt64Value.AsObject,
    autorenewperiod?: Duration_pb.Duration.AsObject,
    expirationtime?: Timestamp_pb.Timestamp.AsObject,
    receiversigrequired: boolean,
    receiversigrequiredwrapper?: google_protobuf_wrappers_pb.BoolValue.AsObject,
  }

  export enum SendrecordthresholdfieldCase {
    SENDRECORDTHRESHOLDFIELD_NOT_SET = 0,
    SENDRECORDTHRESHOLD = 6,
    SENDRECORDTHRESHOLDWRAPPER = 11,
  }

  export enum ReceiverecordthresholdfieldCase {
    RECEIVERECORDTHRESHOLDFIELD_NOT_SET = 0,
    RECEIVERECORDTHRESHOLD = 7,
    RECEIVERECORDTHRESHOLDWRAPPER = 12,
  }

  export enum ReceiversigrequiredfieldCase {
    RECEIVERSIGREQUIREDFIELD_NOT_SET = 0,
    RECEIVERSIGREQUIRED = 10,
    RECEIVERSIGREQUIREDWRAPPER = 13,
  }
}

