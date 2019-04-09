const router = require('koa-router')();
const UserLib = require('../lib/UserLib');
const userLib = new UserLib();

const Utils = require('../utils/utils');
const utils = new Utils();

const addToken = require('../token/add');
const svgCaptcha = require('svg-captcha');

router.prefix('/user');

// 登录
router.post('/login', async (ctx, next) => {
  let resData = utils.initRes();
  const { account, password } = ctx.request.body;
  await userLib.selectUser(account, password).then(res => {
    if (res.length > 0) {
      resData = {
        ...resData,
        data: {
          token: addToken({
            account: res[0].account,
            uid: res[0].id
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
  ctx.body = resData;
});

// 获取验证码
router.get('/getCaptcha', async(ctx, next) => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 4,
    color: true,
    background: '#cc9966'
  });
  ctx.body = captcha;
});

module.exports = router;
