const db = require('../dao/index');
//导入生成token的插件
const jwt = require('jsonwebtoken');
//导入全局文件中的token密钥
const { jwtSecretKey } = require('../variables');
//导入发送邮件方法
const { sendEmail } = require('../utils/sendEmail');

//导入model
const { User } = require('../model/user');
const { FeastTeam } = require('../model/feastTeam');

//发送邮件
exports.sendMail = (req, res) => {
    //发送邮件验证码
    sendEmail(req, res);
}
//登入
exports.login = (req, res) => {
    const data = req.body;
    const code = req.session.code;
    if (data.code != code) {
        return res.err('验证码错误！')
    }
    let sql;
    if (data.userType == 0) {
        sql = 'select * from user where username = ?';
    } else if (data.userType == 1) {
        sql = 'select * from feast_team where username = ?';
    }
    db.query(sql, data.username, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.err('用户不存在,请前往注册！');
        }
        if (result[0].psw != data.psw) {
            return res.err('密码错误')
        }

        //封装一个用户 用于生成token 把密码等设置为空
        const userinfo = { ...result[0], userType: data.userType, psw: '' };
        //存入seesion
        req.session.user = userinfo;
        //生成token 时间为24小时
        const tokenStr = jwt.sign(userinfo, jwtSecretKey, { expiresIn: '24h' });

        //发送用户信息和 token到前端 
        res.send({
            code: 0,
            userinfo,
            //注意在前面加上Bearer 在传出 Bearer 后面有一个空格 
            token: "Bearer " + tokenStr
        })
    })
}
//注册
exports.register = (req, res) => {
    const data = req.body;
    const code = req.session.code;
    if (!data) {
        return res.err('并未输入信息!')
    }
    if (data.code != code) {
        return res.err('验证码输入错误！')
    }
    let sql1;
    if (data.userType == 0) {
        sql1 = 'select * from user where username = ?';
    } else if (data.userType == 1) {
        sql1 = 'select * from feast_team where username = ?';
    } else {
        return res.err('用户类型错误！')
    }
    db.query(sql1, data.username, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length > 0) {
            return res.err('用户已存在！');
        }

        let sql, user;
        if (data.userType == 0) {
            sql = 'insert into user set ?';
            user = new User(data.username, data.psw);
        } else if (data.userType == 1) {
            sql = 'insert into feast_team set ?';
            user = new FeastTeam(data.username, data.psw);
        } else {
            return res.err('用户类型错误！')
        }
        db.query(sql, user, (err, result) => {
            if (err) return res.err(err);
    
            if (result.affectedRows === 1) {
                res.send({
                    code: 0,
                    message: 'register success'
                })
            } else {
                return res.err('注册失败,请里联系管理员！')
            }
        });
    })
}