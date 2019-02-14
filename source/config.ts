export default {
  api: process.env.QILIN_API || 'http://localhost:3001',
  imaginary_api: process.env.IMAGINARY_API || 'http://localhost:9000',
  static: process.env.QILIN_STATIC || 'https://static.protocol.one/qilin',
};
