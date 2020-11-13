module.exports = {
    devServer: {
        proxy:{
            '/api':{
                target:"http://localhost:7777",
                changeOrigin:true, // 是否需要跨域
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    },
}