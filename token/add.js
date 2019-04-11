const jwt = require('jsonwebtoken');
const serect = 'my_token';

module.exports = userInfo => {
  const token = jwt.sign(userInfo, serect, {
    expiresIn: '2h'
  });
  return token;
};
