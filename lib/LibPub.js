const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool(config);

class LibPub {
  // 数据库操作
  exec(sql, params) {
    return new Promise(function (resolve, reject) {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err);
          return;
        }
        connection.query(sql, params, function (error, res) {
          connection.release();
          if (error) {
            reject(error);
            return;
          }
          resolve(res);
        });
      });
    });
  }
}

module.exports = LibPub;
