const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/', createProxyMiddleware({
    target: 'http://suhaibali.pythonanywhere.com',
    changeOrigin: true,
  }));
};

