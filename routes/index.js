const router = require('koa-router')();
const svgCaptcha = require('svg-captcha');

const IndexLib = require('../lib/IndexLib');
const indexLib = new IndexLib();

// 获取验证码
router.get('/getCaptcha', async ctx => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 4,
    color: true,
    height: 34,
    background: '#6e9ac7'
  });
  const key = `${Date.parse(new Date())}${Math.floor(Math.random()*9999+1)}`;
  await indexLib.addKeyValue(key, captcha.text.toLowerCase());
  setTimeout(() => {
    indexLib.removeKeyValue(key);
  }, 60000);
  ctx.body = {
    key,
    data: captcha.data
  };
});

module.exports = router;
