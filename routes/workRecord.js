const router = require('koa-router')();
const WorkLib = require('../lib/WorkLib');
const workLib = new WorkLib();

const Utils = require('../utils/utils');
const utils = new Utils();

router.prefix('/workrecord');

// 列表
router.get('/list', async (ctx, next) => {
  let resData = utils.initRes();
  const uid = 1;
  await workLib.getList(uid).then(res => {
    resData = {
      ...resData,
      data: {
        data: res
      }
    }
  }).then(err => {
    resData = {
      ...resData,
      code: -200,
      detail: '服务器内部错误'
    }
    next();
  });
  ctx.body = resData;
});

module.exports = router;
