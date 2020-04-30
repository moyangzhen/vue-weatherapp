
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.k780.com/app=weather.today', //对应自己后端服务地址 这里一定要完全一致，不是https的一定不要写成https，配置过后不生效要来这里仔细对比下是不是写错了
                changeOrigin: true,//是否允许跨域，true是
                secure:false,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}