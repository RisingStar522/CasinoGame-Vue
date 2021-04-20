import { ExchangeRate as ProtoExchangeRate, ExchangeRateSet as ProtoExchangeRateSet } from "./generated/ExchangeRate_pb";
export interface ExchangeRateSet {
    currentRate: ExchangeRate;
    nextRate: ExchangeRate;
}
export interface ExchangeRate {
    hbarEquiv: number;
    centEquiv: number;
    expirationTime: Date;
}
export declare function exchangeRateToSdk(exchangeRate: ProtoExchangeRate): ExchangeRate;
export declare function exchangeRateSetToSdk(exchangeRateSet: ProtoExchangeRateSet): ExchangeRateSet;
