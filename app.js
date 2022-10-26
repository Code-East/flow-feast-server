//导入express
const express = require('express')
const Joi = require('joi');
//导入使用中间件方法
const { useMiddware } = require('./utils/useMiddware')
//导入使用路由
const { useRouter } = require('./utils/useRouter');

//创建基本的web服务器
const app = express()


//使用处理表单格式的中间件
app.use(express.urlencoded({ extended: false }));
//处理post方式传递的json格式
app.use(express.json());

//使用中间件
useMiddware(app);
//使用路由
useRouter(app);

//定义错误级别的中间件
app.use((err, req, res, next) => {
    //表单验证失败导致的错误
    if (err instanceof Joi.ValidationError) return res.err(err);

    //token的错误
    if (err.name === "UnauthorizedError") return res.send({ code: 400, message: '无效的token呀,请退出重新登入！' })

    if (err) {
        //未知的错误
        return res.send({
            code: '-1',
            message: '系统开了个小差！!'
        })
    }
})

//调用app.listen(端口号，启动后的回调函数) 启动服务器
app.listen(3000, () => {
    console.log('express server runing at http://localhost:3000');
})