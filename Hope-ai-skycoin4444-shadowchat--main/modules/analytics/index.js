const logs = [];

module.exports = {
  log(e) {
    logs.push({ ...e, t: Date.now() });
  },
  summary() {
    return { total: logs.length, logs: logs.slice(-10) };
  }
};
