const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const log4js = require('log4js');
const logger = require('koa-logger');
const koaStatic = require('koa-static');
const session = require('koa-session');

const localFilter = require('./token/proving');

const port = process.env.port || 3000;

const index = require('./routes/index');
const user = require('./routes/user');
const workRecord = require('./routes/workRecord');

const Utils = require('./utils/utils');
const utils = new Utils();

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile',
      filename: `log/log`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

app.use(koaStatic(__dirname + '/static'));
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  localFilter(ctx);
  await next();
});

app.use(utils.checkToken);

app.use(index.routes(), index.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(workRecord.routes(), workRecord.allowedMethods());

app.keys = ['mqyun'];
app.use(session({
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
}, app));

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(port);

console.log(`listening on port ${port}`);
