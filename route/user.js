const express = require('express');
const expressJoi = require('@escook/express-joi');
const { login, register, sendMail, setUserAttribute } = require('../router_handler/user_handler');
const { get_auth_code, user_login_schema, user_register_schema } = require('../schema/user_schema');

const router = express.Router();
router.get('/get_code', expressJoi(get_auth_code), sendMail);
router.post('/login', expressJoi(user_login_schema), login);
router.post('/register',expressJoi(user_register_schema),register)
router.get('/set_user_attribute',setUserAttribute);
//导出
module.exports = router;