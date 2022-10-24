//导入express
const express = require('express')
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

//捕获token错误的中间件
app.use((err, req, res, next) => {
    //判断为是不是由于token导致的错误
    if (err.name === "UnauthorizedError") {
        return res.send({ status: 401, message: '无效的token' })
    }
    //其他的错误到这问题
    res.send({ status: 500, message: '服务器错误!' })
})

//调用app.listen(端口号，启动后的回调函数) 启动服务器
app.listen(3000, () => {
    console.log('express server runing at http://localhost:3000');
})