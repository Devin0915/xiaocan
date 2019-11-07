
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    clientLogLevel: 'info',
    proxy: {
        "/local": {
          target: "http://172.16.6.95:8031/", // 域名
          changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite: {
            "^/local": ""
          }
        }
      }
   }
};
