const stats = { users: 0, requests: 0, revenue: 0 };

module.exports = {
  track(type, value = 0) {
    if (type === "user") stats.users++;
    if (type === "request") stats.requests++;
    if (type === "payment") stats.revenue += value;
  },
  get() {
    return stats;
  }
};
