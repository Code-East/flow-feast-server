//导入cors处理跨域
const cors = require('cors');
//导入express-jwt 用户将客户端发送过来的 JWT 字符串 解析还原成JSON对象
const { expressjwt } = require('express-jwt')
//导入session
const session = require('express-session')

exports.useMiddware = (app) => {
    //导入cors处理跨域
    app.use(cors());

    //使用session中间件 才能使用req.seesion
    app.use(session({
        secret: 'keyboard cat',
        resave: false, //固定写法
        saveUninitialized: true //固定写法
    }))

    //注册使将JWT字符串解析还原成JSON对象的中间件
    //使用expressJWT中间件给定密钥 使用unless来过滤不需要token认证的接口 可以使用正则
    //使用expressJWT解析成功后 就会在req对象身上绑定一个req.auth属性 就是在/login 接口中加密了的JSON对象
    // app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] })
    //     .unless({ path: ['/login'] }))

}
//使用
