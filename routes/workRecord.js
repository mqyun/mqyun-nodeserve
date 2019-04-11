const router = require('koa-router')();
const WorkLib = require('../lib/WorkLib');
const workLib = new WorkLib();

const Utils = require('../utils/utils');
const utils = new Utils();

router.prefix('/workrecord');

// 列表
router.get('/list', async (ctx, next) => {
  let resData = utils.initRes();
  const { pageNo = 1, pageSize = 20, uid } = ctx.request.body;
  await workLib.getList({
    uid,
    pageNo,
    pageSize
  }).then(res => {
    resData = {
      ...resData,
      data: {
        data: res
      }
    }
  }).catch(err => {
    resData = {
      ...resData,
      code: -200,
      detail: '服务器内部错误'
    }
    next(err);
  });
  ctx.body = resData;
});

module.exports = router;
