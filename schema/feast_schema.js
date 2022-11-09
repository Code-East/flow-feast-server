//导入设置规则的joi
const joi = require('joi');

//定义规则
const user_id = joi.number().required();
const description = joi.string().required();
const scale = joi.string().required();
const price = joi.number().required();
const address = joi.string().required();
const date_time = joi.required();

//定义发布宴席的参数规范
exports.public_feast_schema = {
    body: {
        user_id,
        description,
        scale,
        price,
        address,
        date_time
    }
}
