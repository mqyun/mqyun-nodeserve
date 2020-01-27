const router = require('koa-router')();
const IndexLib = require('../lib/IndexLib');
const indexLib = new IndexLib();
const UserLib = require('../lib/UserLib');
const userLib = new UserLib();

const Utils = require('../utils/utils');
const utils = new Utils();

const addToken = require('../token/add');

const publicInfo = require('../public');
const { routerPublicUrl } = publicInfo;

router.prefix(`${routerPublicUrl}/user`);

// 登录
router.post('/login', async (ctx, next) => {
  let resData = utils.initRes();
  const { account, password, key, code } = ctx.request.body;
  let captcha;
  await indexLib.getKeyValue(key).then(res => {
    if (res && res.length > 0) {
      captcha = res[0].y_value;
    }
  });
  if (code.toLowerCase() === captcha) {
    await userLib.selectUser(account, password).then(res => {
      if (res.length > 0) {
        resData = {
          ...resData,
          data: {
            token: addToken({
              uid: res[0].id,
              account: res[0].account
            })
          },
          detail: '登录成功'
        };
      } else {
        resData = {
          ...resData,
          code: -100,
          detail: '账号或密码错误'
        };
      }
    }).catch(err => {
      resData = {
        ...resData,
        code: -200,
        detail: '服务器内部错误'
      }
      next();
    });
  } else {
    resData = {
      ...resData,
      code: -100,
      detail: '验证码错误'
    }
  }
  ctx.body = resData;
});

module.exports = router;
