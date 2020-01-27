const router = require('koa-router')();
const svgCaptcha = require('svg-captcha');

const IndexLib = require('../lib/IndexLib');
const indexLib = new IndexLib();

const publicInfo = require('../public');
const { routerPublicUrl } = publicInfo;

router.prefix(`${routerPublicUrl}/`);

router.get('/getCaptcha', async ctx => {
  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1li',
    noise: 0,
    color: true,
    height: 40,
    background: '#23222d'
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
