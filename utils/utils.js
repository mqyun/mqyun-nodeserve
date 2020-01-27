const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

const IndexLib = require('../lib/IndexLib');
const indexLib = new IndexLib();

const publicInfo = require('../public');
const { routerPublicUrl } = publicInfo;

class Utils {
  // 初始化接口返回
  initRes() {
    return {
      code: 0,
      data: {},
      detail: '成功'
    }
  }

  async checkToken(ctx, next) {
    const reqUrl = ctx.request.url;
    const allowUrl = [`${routerPublicUrl}/getCaptcha`, `${routerPublicUrl}/user/login`];
    if (allowUrl.indexOf(reqUrl) > -1) {
      await next();
    } else {
      const token = ctx.header.authorization;
      let response = {
        code: 0,
        data: {},
        detail: '请求成功'
      };
      if (token) {
        const payload = await verify(token.split(' ')[1], 'my_token');
        if (payload.exp < Date.parse(new Date()) / 1000) {
          response = {
            ...response,
            code: -400,
            detail: 'token过期'
          }
        }
        if (!payload.uid) {
          response = {
            ...response,
            code: -400,
            detail: 'token验证失败'
          }
        } else {
          ctx.request.body.uid = payload.uid;
        }
        if (response.code < 0) {
          ctx.body = response;
        } else {
          await next(payload);
        }
      } else {
        response = {
          ...response,
          code: -400,
          detail: 'token缺失'
        }
        ctx.body = response;
      }
    }
  }
}

module.exports = Utils;
