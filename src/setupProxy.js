const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8787',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // 移除 /api 前缀
      },
    })
  );
};
