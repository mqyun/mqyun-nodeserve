const LibPub = require('./LibPub');

class WorkLib extends LibPub {
  // 获取所有记录
  getList(...params) {
    const sql = 'select * from WORK_RECORD where uid = ?;';
    return this.exec(sql, params);
  }
  // 添加记录
  addWork(...params) {
    const sql = 'insert into WORK_RECORD(time, content, project, uid) values(?,?,?,?);';
    return this.exec(sql, params);
  }
  // 删除记录
  delWork(...params) {
    const sql = 'delete from WORK_RECORD where id = ?;';
    return this.exec(sql, params);
  }
  // 获取某条记录
  getThisWork(...params) {
    const sql = 'select * from WORK_RECORD where id = ?;';
    return this.exec(sql, params);
  }
  // 修改记录
  updateThisWork(...params) {
    const sql = 'update WORK_RECORD set time = ?, content = ? where id = ?;';
    return this.exec(sql, params);
  }
}

module.exports = WorkLib;
