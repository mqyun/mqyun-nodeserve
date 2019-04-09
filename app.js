const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const log4js = require('log4js');
const logger = require('koa-logger');
const koaStatic = require('koa-static');

const localFilter = require('./token/proving');

const port = process.env.port || 3000;

const user = require('./routes/user')

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

app.use(user.routes(), user.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(port);

console.log(`listening on port ${port}`);
