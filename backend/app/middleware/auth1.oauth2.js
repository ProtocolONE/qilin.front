const fs = require('fs');
const urlJoin = require('url-join');
const buildUrl = require('build-url');
const Redis = require('ioredis');
const { JwtVerifier, StorageRedis, koaOauthMiddleware } = require('authone-jwt-verifier-node');

const config = require('../../config/config');

const auth1PostmessageHtmlTemplate = fs.readFileSync(config.auth1PostmessageHtmlTemplatePath).toString('utf8');

const callbackUrl = buildUrl(config.publicHost, {
  path: urlJoin([config.routesPrefix, config.auth1RoutesNamespace, 'callback']),
});

// oauth endpoints middleware creation
const verifierOptions = {
  issuer: config.auth1Issuer,
  clientId: config.auth1ClientId,
  clientSecret: config.auth1ClientSecret,
  redirectUrl: callbackUrl,
  scopes: config.auth1Scope,
};

const endpointsOptions = {
  namespace: config.auth1SessionNamespace,
  postMessageHtmlTemplate: auth1PostmessageHtmlTemplate,
  postMessageTargetOrigin: config.postMessageTargetOrigin,
};

let storage = null;
if (config.redisHost && config.redisPort) {
  const redisInstance = new Redis(config.redisHost, config.redisPort);
  storage = new StorageRedis(redisInstance);
}
const jwtVerifier = new JwtVerifier(verifierOptions, storage);

module.exports = koaOauthMiddleware.oauthEndpoints(jwtVerifier, endpointsOptions);
