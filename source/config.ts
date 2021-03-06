export default {
  adminApi: process.env.QILIN_ADMIN_API || 'http://127.0.0.1:3001/admin/api/v1',
  api: process.env.QILIN_API || 'http://127.0.0.1:3001/api/v1',
  authApi: process.env.PUBLIC_HOST || 'https://qilin.tst.protocol.one',
  imaginary_api: process.env.IMAGINARY_API || 'http://127.0.0.1:9000',
  static: process.env.QILIN_STATIC || 'https://static.protocol.one/qilin',
  centrifugeUrl: process.env.CENTRIFUGE_URL || 'ws://127.0.0.1:8000/connection/websocket',
};
