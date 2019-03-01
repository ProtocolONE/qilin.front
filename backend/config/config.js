const path = require('path');

const envUtils = require('../app/utils/env');

const getEnvVariable = envUtils.getEnvVariable;
const getEnvVariableArray = envUtils.getEnvVariableArray;

const config = {
  serverPort: +getEnvVariable('SERVER_PORT', 80),

  redisHost: getEnvVariable('REDIS_HOST', 'localhost'),
  redisPort: +getEnvVariable('REDIS_PORT', '6379'),

  sessionMaxAge: +getEnvVariable('SESSION_MAX_AGE', '21600'), // 6 hours, in seconds
  sessionCookieName: getEnvVariable('SESSION_COOKIE_NAME', 'pssid'),
  sessionCookieSignKey: getEnvVariable('SESSION_COOKIE_SIGN_KEY', '02e435ef-7015-4c9b-8e4e-00a376f80332'),

  routesPrefix: getEnvVariable('ROUTES_PREFIX', ''),
  auth1RoutesNamespace: '/auth1',

  sentryDsn: getEnvVariable('SENTRY_DSN', 'https://2fc1a112904e472da22284cad12c6d87@sentry.tst.protocol.one/10'),

  publicHost: getEnvVariable('PUBLIC_HOST', 'http://127.0.0.1'),

  postMessageTargetOrigin: getEnvVariable('POST_MESSAGE_TARGET_ORIGIN', 'http://127.0.0.1:8080'),

  auth1ClientId: getEnvVariable('AUTH1_CLIENT_ID', '5c79297b1ba28e00014ff57b'),
  auth1ClientSecret: getEnvVariable('AUTH1_CLIENT_SECRET', 'ACWFDVzUE9whecVRTH5OOIIedkioUMsC6GgXhcrFpui798fDz8ADW0GZbde7ukxg'),
  auth1Scope: getEnvVariableArray('AUTH1_CLIENT_SCOPE', 'openid,offline'),
  auth1Issuer: getEnvVariable('AUTH1_ISSUER_URL', 'https://auth1.tst.protocol.one'),
  auth1PostmessageHtmlTemplatePath: path.resolve('backend/templates/auth1.postmessage.html.template'),
  auth1SessionNamespace: 'auth1',

  corsValidOrigins: getEnvVariableArray('CORS_VALID_ORIGINS', '*'),
};

module.exports = config;
