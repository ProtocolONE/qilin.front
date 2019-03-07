export default {
  api: process.env.QILIN_API || 'http://127.0.0.1:3001',
  imaginary_api: process.env.IMAGINARY_API || 'http://127.0.0.1:9000',
  static: process.env.QILIN_STATIC || 'https://static.protocol.one/qilin',
};
