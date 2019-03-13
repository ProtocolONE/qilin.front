export default {
  adminApi: process.env.QILIN_ADMIN_API || 'http://localhost:3001/admin/api/v1',
  api: process.env.QILIN_API || 'http://localhost:3001/api/v1',
  imaginary_api: process.env.IMAGINARY_API || 'http://localhost:9000',
  static: process.env.QILIN_STATIC || 'https://static.protocol.one/qilin',
};
