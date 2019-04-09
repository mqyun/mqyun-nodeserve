const jwt = require('jsonwebtoken');
const serect = 'token';

module.exports = userInfo => {
  const token = jwt.sign({
    account: userInfo.account,
    uid: userInfo.id
  }, serect, {
    expiresIn: '1h'
  });
  return token;
};
