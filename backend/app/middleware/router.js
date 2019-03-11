const Router = require('koa-router');

const config = require('../../config/config');

const auth1Middleware = require('./auth1.oauth2');

const router = new Router({
  prefix: config.routesPrefix,
});

const auth1RoutesNamespace = config.auth1RoutesNamespace;

router
  .get('/_healthz', async (ctx, next) => {
    ctx.body = {};
    next();
  })

  .get(`${auth1RoutesNamespace}/login`, auth1Middleware.login)
  .get(`${auth1RoutesNamespace}/callback`, auth1Middleware.authorize)
  .get(`${auth1RoutesNamespace}/refresh`, auth1Middleware.refresh)
  .get(`${auth1RoutesNamespace}/logout`, auth1Middleware.logout);


module.exports.routes = function () {
  return router.routes();
};
module.exports.allowedMethods = function () {
  return router.allowedMethods();
};
