import Big from 'big.js';

const units = {
  btc: 1,
  mbtc: 1 / 1E3,
  bit: 1 / 1E6,
  satoshi: 1 / 1E8,
};

const aliases = {
  btc: ['bitcoin', 'bitcoins'],
  mbtc: ['millibtc'],
  bit: ['μbtc', 'microbtc'],
  satoshi: ['sat', 'sats', 'satoshis']
};

const display = {
  btc: {
    format: '{amount} BTC',
    fractionDigits: 8
  },
  mbtc: {
    format: '{amount} mBTC',
    fractionDigits: 5
  },
  bit: {
    format: '{amount} μBTC',
    fractionDigits: 2
  },
  satoshi: {
    format: '{amount} satoshi',
    pluralize: true,
    fractionDigits: 0
  },
};

const getUnitNameByAlias = (unitName) => {
  const name = unitName.toLowerCase();

  const alias = Object.keys(aliases).find(key => aliases[key].includes(name));

  if (alias === undefined) {
    throw new Error(`Unit '${unitName}' is not supported`);
  }

  return alias;
};

const getUnitName = (unitName) => {
  const name = unitName.toLowerCase();

  const unit = units[name];

  if (unit !== undefined) return name;

  return getUnitNameByAlias(unitName);
};

const getUnit = unit => units[getUnitName(unit)];

const setDisplay = (unit, options) => {
  display[unit.toLowerCase()] = options;
};

const getDisplay = unit => display[getUnitName(unit)];

const setUnit = (unit, value, displayOptions = null) => {
  units[unit.toLowerCase()] = value;
  display[unit.toLowerCase()] = displayOptions !== null ? displayOptions : { format: `{amount} ${unit}` };
};

const convert = (amount, from, to) => {
  if (Number.isNaN(parseFloat(amount)) || !Number.isFinite(amount)) {
    return 0;
  }

  const amountInFromUnit = Big(amount).times(getUnit(from));

  return parseFloat(amountInFromUnit.div(getUnit(to)));
};

class Bitcoin {
  constructor(value, unit) {
    this._value = value;
    this._unit = unit;
  }

  to(newUnit) {
    this._value = convert(this._value, this._unit, newUnit);
    this._unit = newUnit;

    return this;
  }

  value() {
    return this._value;
  }

  format() {
    const displayUnit = getDisplay(this._unit);

    const { format, fractionDigits, trailing } = displayUnit;

    let options = { maximumFractionDigits: fractionDigits };

    if (trailing) {
      options = { minimumFractionDigits: fractionDigits };
    }

    let value;

    if (fractionDigits !== undefined) {
      const fractionPower = Big(10).pow(fractionDigits);
      value = parseFloat(Big(Math.floor(Big(this._value).times(fractionPower))).div(fractionPower));
    } else {
      value = this._value;
    }

    let formatted = format.replace('{amount}', parseFloat(value).toLocaleString(undefined, options));

    if (displayUnit.pluralize && this._value !== 1) {
      formatted += 's';
    }

    return formatted;
  }

  toString() {
    return this._value.toString();
  }
}

const bitcoin = (value, unit) => new Bitcoin(value, unit);

bitcoin.convert = convert;
bitcoin.setDisplay = setDisplay;
bitcoin.setUnit = setUnit;
bitcoin.getUnit = getUnit;
bitcoin.setFiat = (currency, rate, display = null) => {
  setUnit(currency, 1 / rate, display);
};

export default bitcoin;
