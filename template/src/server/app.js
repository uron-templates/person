require('../config');
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const serve = require('koa-static');
const cors = require('@koa/cors');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const config = require('config');
const koaBody = require('koa-bodyparser');
const logger = require('koa-logger');

const router = require('./routers');
const auth = require('./middleware/auth');

const app = new Koa();

module.exports = (options) => {
  app.use(logger());
  app.use(cors({
    'Access-Control-Allow-Origi': (ctx) => {
      if (/localhost/i.test(ctx.request.origin)) {
        return ctx.request.origin;
      }
    }
  }));
  // body parse
  app.use(koaBody());

  app.use(auth());

  app.use(conditional());
  app.use(etag());

  const root = config.staticRootDir;
  app.use(serve(root, {
    maxage: 1000 * 60 * 60 * 1
  }));

  app.use(router.routes());
  app.use(router.allowedMethods());

  router.get('/**', (ctx, next) => {
    ctx.body = '404';
    ctx.status = 404;
  });
  return app;
};
