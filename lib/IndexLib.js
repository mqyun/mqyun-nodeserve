const LibPub = require('./LibPub');

class IndexLib extends LibPub {
  // 添加key-value
  addKeyValue(...params) {
    const sql = 'insert into KEY_VALUE(y_key, y_value) values(?,?);';
    return this.exec(sql, params);
  }
  // 获取key-value
  getKeyValue(...params) {
    const sql = 'select * from KEY_VALUE where y_key = ?;';
    return this.exec(sql, params);
  }
  // 删除key
  removeKeyValue(...params) {
    const sql = 'delete from KEY_VALUE where y_key = ?;';
    return this.exec(sql, params);
  }
  checkUserById(...params) {
    const sql = 'select * from user where id = ?;';
    return this.exec(sql, params);
  }
}

module.exports = IndexLib;
