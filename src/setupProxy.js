const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:51965',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove /api prefix
      },
      onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
      },
    })
  );
};
