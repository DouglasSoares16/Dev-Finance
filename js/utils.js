const format = {
  getValue(value) {
    return value.replace("R$", "").replace(",", ".");
  },

  showValue(value) {
    return value.toFixed(2).replace(".", ",")
  },

  showValueTotal(value) {
    return Number(value.toString().replace("-", ""))
  },

  amount(value) {
    return value = Number(value);
  },

  date(date) {
    let splitDate = date.split("-");

    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  }
}