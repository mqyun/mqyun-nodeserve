const LibPub = require('./LibPub');

class UserLib extends LibPub {
  // 查找
  selectUser(...params) {
    const sql = 'select * from user where account = ? and password = ?;';
    return this.exec(sql, params);
  }
}

module.exports = UserLib;
