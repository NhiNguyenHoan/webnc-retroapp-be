const bcrypt = require("bcryptjs");

module.exports = async (password) => {
  return new Promise((resolve) => {
    bcrypt.hash(password, 10, (err, hash) => {
      resolve(hash);
    });
  });
};
