export default {
  format: {
    getValue(value) {
      return value.replace("R$", "").replace(",", ".");
    },

    showValue(value) {
      return value.toFixed(2).replace(".", ",")
    },

    showValueTotal(value) {
      return Number(value.toString().replace("-", ""))
    }
  }
};