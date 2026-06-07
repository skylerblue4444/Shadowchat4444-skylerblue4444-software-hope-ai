module.exports = {
  stripe(amount) {
    return { provider: "stripe", amount, status: "created" };
  },

  crypto(amount) {
    return { provider: "crypto", amount, coin: "USDT" };
  }
};
