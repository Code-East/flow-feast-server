//导入设置规则的joi
const joi = require('joi');

//定义规则
const employ_pic = joi.string().required();
const age = joi.number().min(18).max(65).required();
const name = joi.string().min(1).max(5).required();
const sex = joi.required();
const health_card = joi.string().required();
const position = joi.required();
const team_id = joi.required();
const eid = joi.required();
const code = joi.string().alphanum().required();
const userType = joi.required();
const create_time = joi.required();
const userpic = joi.string().min(0);
const nickname = joi.string().min(3).max(10).required();
const email = joi.string().pattern(/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/).required();
const isadmin = joi.required();
const user_id = joi.required();

//增加员工规则
exports.add_employee_scheam = {
    body: {
        employ_pic,
        age,
        name,
        sex,
        health_card,
        position,
        team_id
    }
}
//修改员工规则
exports.update_employee_scheam = {
    body: {
        eid,
        employ_pic,
        age,
        name,
        sex,
        health_card,
        position,
        team_id
    }
}