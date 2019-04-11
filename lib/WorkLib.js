const LibPub = require('./LibPub');

class WorkLib extends LibPub {
  // 获取记录数
  getTotal(...params) {
    const sql = 'select count(*) from WORK_RECORD;';
    return this.exec(sql, params);
  }
  // 获取所有记录
  getList(params) {
    const { uid, pageNo, pageSize } = params;
    const sql = `select * from WORK_RECORD where uid = ? order by id desc limit ${(pageNo-1)*pageSize}, ${pageSize};`;
    return this.exec(sql, [uid]);
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
