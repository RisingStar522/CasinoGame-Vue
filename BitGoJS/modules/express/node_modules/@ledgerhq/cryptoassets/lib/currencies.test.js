"use strict";

var _fiats = require("./fiats");

var _tokens = require("./tokens");

var _currencies = require("./currencies");

test("can get currency by coin type", () => {
  expect((0, _currencies.getCryptoCurrencyById)("bitcoin")).toMatchObject({
    id: "bitcoin",
    name: "Bitcoin"
  });
  expect((0, _currencies.getCryptoCurrencyById)("litecoin")).toMatchObject({
    id: "litecoin",
    name: "Litecoin"
  });
  expect((0, _currencies.hasCryptoCurrencyId)("bitcoin")).toBe(true);
  expect((0, _currencies.hasCryptoCurrencyId)("")).toBe(false);
  expect(() => (0, _currencies.getCryptoCurrencyById)("")).toThrow();
  expect((0, _currencies.hasCryptoCurrencyId)("_")).toBe(false);
  expect(() => (0, _currencies.getCryptoCurrencyById)("_")).toThrow();
});
test("there are some dev cryptocurrencies", () => {
  const all = (0, _currencies.listCryptoCurrencies)(true);
  const prod = (0, _currencies.listCryptoCurrencies)();
  expect((0, _currencies.listCryptoCurrencies)(false)).toBe((0, _currencies.listCryptoCurrencies)());
  expect(all).not.toBe(prod);
  expect(all.filter(a => !a.isTestnetFor)).toMatchObject(prod);
  expect(all.length).toBeGreaterThan(prod.length);
});
test("all cryptocurrencies match (by reference) the one you get by id", () => {
  for (let c of (0, _currencies.listCryptoCurrencies)()) {
    expect(c).toBe((0, _currencies.getCryptoCurrencyById)(c.id));
  }
});
test("there is no testnet or terminated coin by default", () => {
  for (let c of (0, _currencies.listCryptoCurrencies)()) {
    expect(!c.terminated).toBe(true);
    expect(!c.isTestnetFor).toBe(true);
  }
});
test("all cryptocurrencies have at least one unit", () => {
  for (let c of (0, _currencies.listCryptoCurrencies)()) {
    expect(c.units.length).toBeGreaterThan(0);
  }
});
test("fiats list is always the same", () => {
  expect((0, _fiats.listFiatCurrencies)()).toEqual((0, _fiats.listFiatCurrencies)());
});
test("fiats list elements are correct", () => {
  const tickers = {};

  for (const fiat of (0, _fiats.listFiatCurrencies)()) {
    expect(fiat.ticker).toBeTruthy();
    expect(typeof fiat.ticker).toBe("string");
    expect(tickers[fiat.ticker]).toBeFalsy();
    expect(fiat.units.length).toBeGreaterThan(0);
    const unit = fiat.units[0];
    expect(unit.code).toBeTruthy();
    expect(typeof unit.code).toBe("string");
    expect(unit.name).toBeTruthy();
    expect(typeof unit.name).toBe("string");
    expect(unit.magnitude).toBeGreaterThan(-1);
    expect(typeof unit.magnitude).toBe("number");
    tickers[fiat.ticker] = unit;
  }
});
test("tokens are correct", () => {
  expect((0, _tokens.listTokens)().length).toBeGreaterThan(0);

  for (const token of (0, _tokens.listTokens)()) {
    expect(token.ticker).toBeTruthy();
    expect(typeof token.id).toBe("string");
    expect(typeof token.name).toBe("string");

    if (token.ledgerSignature) {
      expect(typeof token.ledgerSignature).toBe("string");
    }

    expect(typeof token.tokenType).toBe("string");
    expect(typeof token.parentCurrency).toBe("object");
    expect((0, _currencies.hasCryptoCurrencyId)(token.parentCurrency.id)).toBe(true);
    expect(typeof token.ticker).toBe("string");
    expect(token.units.length).toBeGreaterThan(0);
    const unit = token.units[0];
    expect(unit.code).toBeTruthy();
    expect(typeof unit.code).toBe("string");
    expect(unit.name).toBeTruthy();
    expect(typeof unit.name).toBe("string");
    expect(unit.magnitude).toBeGreaterThan(-1);
    expect(typeof unit.magnitude).toBe("number");

    if (token.compoundFor) {
      const t = (0, _tokens.findTokenById)(token.compoundFor);
      expect(typeof t).toBe("object");
    }
  }
});
test("fiats list is sorted by ticker", () => {
  expect((0, _fiats.listFiatCurrencies)().map(fiat => fiat.ticker).join(",")).toEqual((0, _fiats.listFiatCurrencies)().map(fiat => fiat.ticker).sort((a, b) => a > b ? 1 : -1).join(","));
});
test("can get fiat by coin type", () => {
  expect((0, _fiats.getFiatCurrencyByTicker)("USD").units[0]).toMatchObject({
    magnitude: 2
  });
  expect((0, _fiats.getFiatCurrencyByTicker)("EUR").units[0]).toMatchObject({
    magnitude: 2
  }); // this is not a fiat \o/

  expect(() => (0, _fiats.getFiatCurrencyByTicker)("USDT").units[0]).toThrow();
  expect((0, _fiats.hasFiatCurrencyTicker)("USD")).toBe(true);
  expect((0, _fiats.hasFiatCurrencyTicker)("USDT")).toBe(false);
});
//# sourceMappingURL=currencies.test.js.map