const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/janus',{
      target: 'http://3.37.190.27:8088',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/admin',{
      target: 'http://3.37.190.27:7088',
      changeOrigin: true,
    })
  );
};