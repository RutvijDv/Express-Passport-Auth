const bcrypt = require("bcrypt");
const saltRounds = 10;

function genPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

function validPassword(password, hash, salt) {
  bcrypt
    .compare(password, hash)
    .then(function (res) {
      return res;
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
