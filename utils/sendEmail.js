const { ok } = require('assert');
const nodeMailer = require('nodemailer');
//引入证书文件
const credentital = require('../variables');

//创建传送方式
const transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
        user: credentital.qq.user,
        pass: credentital.qq.pass
    }
})

//发送邮件
exports.sendEmail = function(req,res){
    const data = req.query;

    if (data.username == undefined) {
        return res.err('未输入邮箱！')
    }
    //随机数1000-10000
    let code = Math.ceil(Math.random() * 9000 + 1000);
    //存入session
    req.session.code = code;
    //发送的内容
    let options = {
        from:'2531122734@qq.com',
        to:data.username,
        subject:'欢迎你使用flow-feast系统',
        html:'<span>你的验证码是：<b>'+code+'</b></span>'
    }

    transporter.sendMail(options,function(err,msg){
        if (err) {
            return res.err(err);
        }else{
            res.send({
                code:0,
                message:'sueccess',
                data:'ok',
            });
        }
    })
    
}