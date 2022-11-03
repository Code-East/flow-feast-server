//导入设置规则的joi
const joi = require('joi');

//定义规则
const username = joi.string().pattern(/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/).required();
const psw = joi.string().pattern(/^[\S]{5,10}$/).required();
const code = joi.string().alphanum().required();
const userType = joi.required();
const create_time = joi.required();
const userpic = joi.string().min(0);
const nickname = joi.string().min(3).max(10).required();
const email = joi.string().pattern(/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/).required();
const isadmin = joi.required();
const user_id = joi.required();

//定义登入的规则对象 是body形式传递过来的里面包含username和password
exports.get_auth_code = {
    query: {
        username
    }
}
exports.user_login_schema = {
    body: {
        username,
        psw,
        code,
        userType,
    }
}
exports.user_register_schema = {
    body: {
        username,
        psw,
        code,
        userType,
    }
}
// exports.adduser_schema = {
//     body: {
//         userpic,
//         username,
//         password,
//         nickname,
//         email,
//         isadmin
//     }
// }
// exports.setuser_schema = {
//     body: {
//         user_id,
//         userpic,
//         username,
//         password,
//         nickname,
//         email,
//         isadmin
//     }
// }