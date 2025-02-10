var configureFn = (proxy, _options) => {
  proxy.on('error', (err, _req, _res) => {
    console.log('proxy error', err);
  });
  proxy.on('proxyReq', (proxyReq, req, _res) => {
    const headers = proxyReq.getHeaders();
    console.log(req.method, req.url, ' -> ', `${headers.host}${proxyReq.path}`);
  });
  proxy.on('proxyRes', (proxyRes, req, _res) => {
    console.log(
      req.method,
      'Target Response',
      proxyRes.statusCode,
      ':',
      req.url,
    );
  });
};

var PROXY_CONF = [
  {
    context: ['/api/streaming'],
    target: '',
    changeOrigin: true,
    headers: {
      Origin: '',
    },
  },
  {
    context: ['/api', '/identity'],
    target: '',
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    configure: configureFn,
  },
];

module.exports = PROXY_CONF;
