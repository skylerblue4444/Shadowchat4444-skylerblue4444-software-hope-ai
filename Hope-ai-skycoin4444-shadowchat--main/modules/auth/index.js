const jwt = require("jsonwebtoken");

const SECRET = "sams-secret";

module.exports = {
  login(user) {
    return { token: jwt.sign({ user }, SECRET) };
  },

  verify(token) {
    return jwt.verify(token, SECRET);
  }
};
