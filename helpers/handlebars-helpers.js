
module.exports = {
  ifCond: (a, b, options) => {
    return a === b ? options.fn(this) : options.inverse(this)
  },
  getCartAmount: array => {
    return array.length
  }
}
