const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:9999/', changeOrigin:true });
//target是要请求服务器的地址

module.exports=function(app0){
    app0.use(apiProxy)
}