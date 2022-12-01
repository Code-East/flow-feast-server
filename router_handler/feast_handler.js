const db = require('../dao/index');
const { formatDate } = require('../utils/formateDate')
const AlipayformData = require('alipay-sdk/lib/form').default;
const { alipaySdk } = require('../utils/alipay');
//获取团队列表
exports.getFeastTeamList = (req, res) => {
    let pageSize, currentPage;
    const data = req.query;
    if (!data) {
        pageSize = 5,
            currentPage = 1
    } else {
        pageSize = data.pageSize;
        currentPage = data.currentPage;
    }
    const start = (currentPage - 1) * pageSize;

    const sql1 = 'select count(*) as total from feast_team';
    db.query(sql1, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result < 0) {
            return res.err('暂无数据');
        }
        const total = result[0].total;
        const sql2 = 'select * from feast_team where isonline=1 limit ' + start + ',' + pageSize + '';
        db.query(sql2, (err, result) => {
            if (err) {
                return res.err(err);
            }
            if (result < 0) {
                return res.err('暂无数据');
            }
            res.send({
                code: 0,
                message: 'success',
                data: {
                    list: result,
                    total
                }
            })
        })
    })


}
//获取发布宴席列表
exports.getFeastList = (req, res) => {
    let pageSize, currentPage;
    const data = req.query;
    if (!data) {
        pageSize = 5,
            currentPage = 1
    } else {
        pageSize = data.pageSize;
        currentPage = data.currentPage;
    }
    const start = (currentPage - 1) * pageSize;

    const sql1 = 'select count(*) as total from feast where status != 1 and status != 0';
    db.query(sql1, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result < 0) {
            return res.err('暂无数据');
        }
        const total = result[0].total;
        const sql2 = 'select a.*,b.nickname from feast a,user b where status != 1 and status != 0 and a.user_id = b.uid limit ' + start + ',' + pageSize + '';
        // select * from feast where online=1 
        db.query(sql2, (err, result) => {
            if (err) {
                return res.err(err);
            }
            res.send({
                code: 0,
                message: 'success',
                data: {
                    list: result,
                    total
                }
            })
        })
    })

}
//获取个人发布的宴席
exports.getPersonalFeast = (req, res) => {
    const userinfo = req.auth;
    if (!userinfo || userinfo.userType != 0) {
        return res.err('未找到用户信息')
    }
    const sql = 'select * from feast where user_id = ? order by create_time desc';
    db.query(sql, userinfo.uid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 0) {
            return res.err('暂无数据')
        }
        res.send({
            code: 0,
            message: 'success',
            data: result
        })
    })

}
//发布宴席
exports.publicFeast = (req, res) => {
    //获取宴席数据
    const data = req.body;
    // 将日期变为年月日
    const date = new Date(data.date_time)
    data.date_time = formatDate(date);
    //加入create_time
    data.create_time = new Date();
    //SQL语句
    const sql = 'insert into feast set ?'
    db.query(sql, data, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('提交失败，请联系管理员')
        }
        res.send({
            code: 0,
            message: 'submit success',
        })
    })

}
//查看宴席
exports.checkFeast = (req, res) => {
    const fid = req.query.fid;
    if (!fid) {
        return res.err('查看失败没有传入fid');
    }
    const sql = 'select a.*,b.nickname from feast a,user b where fid = ? and a.user_id = b.uid;';
    db.query(sql, fid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.err('查询失败，请联系管理员');
        }
        res.send({
            code: 0,
            message: 'success',
            data: result[0]
        })
    })

}
//删除宴席
exports.deleteFeast = (req, res) => {
    const fid = req.query.fid;
    const sql = 'delete from feast where fid = ?';
    db.query(sql, fid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('删除失败,请联系管理员')
        }
        res.send({
            code: 0,
            message: 'success',
        })
    })

}
//修改宴席
exports.updataFeast = (req, res) => {
    //获取宴席数据
    const { feast, fid } = req.body;
    // 将日期变为年月日
    const date = new Date(feast.date_time)
    feast.date_time = formatDate(date);
    // 修改的sql
    const sql = 'update feast set ? where fid = ?';
    db.query(sql, [feast, fid], (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('修改失败，请联系管理员');
        }
        res.send({
            code: 0,
            message: 'success',
        })
    })

}
//获取团队承接的宴席
exports.getTeamFeast = (req, res) => {
    const id = req.query.tid;
    if (!id) {
        return res.err('获取失败，未传入id');
    }
    const sql = 'select a.*,b.nickname from feast a,user b where team_id = ? and a.user_id = b.uid;';
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.err('暂无数据');
        }
        res.send({
            code: 0,
            message: 'success',
            data: result
        })
    })
}
//下单宴席
exports.paymentFeast = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.err('未传入宴席对象');
    }
    //格式化时间
    data.date_time = new Date(data.date_time);
    data.status = 0;
    data.create_time = new Date();
    const sql = 'insert into feast set ?';
    db.query(sql, data, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('下单失败')
        }
        res.send({
            code: 0,
            message: 'payment success'
        })
    })
}
//付款
exports.alipay = (req, res) => {
    const order = req.body.order;
    const total_amount = req.body.total;
    const data = {};
    //填写参数
    data.team_id = order.team_id;
    data.user_id = order.user_id;
    data.order_status = 1;
    data.goods_count = order.scale;
    data.price = total_amount;
    data.pay_time = new Date();

    const formData = new AlipayformData();
    formData.setMethod('get');
    formData.addField('returnUrl', 'http://127.0.0.1:8080'); //支付成功后跳转页面

    formData.addField('bizContent', {
        out_trade_no: "21245956656" + Math.random(1, 400) + "1128",
        product_code: "FAST_INSTANT_TRADE_PAY",
        subject: "宴席下单",
        body: "商品详情",
        total_amount: total_amount
    })

    let result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData }
    );

    result.then((resp) => {
        const sql = 'insert into feast_order set ?';
        db.query(sql, data, (err, result1) => {
            if (err) {
                return res.err(err);
            }
            if (result1.affectedRows !== 1) {
                return res.err('下单失败！');
            }
            res.send({
                sucess: 'true',
                code: 0,
                result: resp
            })
        })

    })
}
//完成宴席
exports.completeFeast = (req, res) => {
    const { fid, environment } = req.query;
    if (!fid || !environment) {
        return res.err('完成宴席失败,未接收到指定参数！')
    }
    const sql = 'update feast set environment = ?,status = 4 where fid = ?';
    db.query(sql, [environment, fid], (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('修改失败,请联系管理员');
        }
        res.send({
            code: 0,
            message: 'complete success'
        })
    })
}