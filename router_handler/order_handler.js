const db = require('../dao/index');
//获取宴席订单列表
exports.getOrderList = (req, res) => {
    const { userinfo, pageObj } = req.body;
    if (!userinfo) {
        return res.err('未传入用户信息');
    }
    let sql, id;
    if (userinfo.userType === '0') {
        const start = (pageObj.currentPage - 1) * pageObj.pageSize;
        sql = 'select a.*,b.nickname,c.tname from feast_order a,user b,feast_team c where a.user_id = b.uid and a.team_id = c.tid and a.user_id = ? limit ' + start + ',' + pageObj.pageSize + '';
        id = userinfo.uid;
    } else if (userinfo.userType === '1') {
        const start = (pageObj.currentPage - 1) * pageObj.pageSize;
        sql = 'select a.*,b.nickname,c.tname from feast_order a,user b,feast_team c where a.user_id = b.uid and a.team_id = c.tid and a.team_id = ? limit ' + start + ',' + pageObj.pageSize + '';
        id = userinfo.tid;
    } else {
        return res.err('用户类型错误');
    }
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.send({
                code: 0,
                message: '暂无数据',
                data: []
            })
        }

        const sql1 = 'select count(*) as total from feast_order';
        db.query(sql1, (err, result1) => {
            if (err) {
                return res.err(err)
            }
            if (result1.length < 1) {
                return res.send({
                    code: 0,
                    message: '暂无数据',
                    data: []
                })
            }
            res.send({
                code: 0,
                message: 'success',
                data: {
                    list: result,
                    total: result1[0].total
                }
            })
        })

    })
}

//删除订单
exports.deleteOrder = (req, res) => {
    const oid = req.query.oid;
    if (!oid) {
        return res.err('未传入要删除的订单ID');
    }
    const sql = 'delete from feast_order where oid = ?';
    db.query(sql, oid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows != 1) {
            return res.err('删除失败！')
        }
        res.send({
            code: 0,
            message: 'delete success',
        })
    })
}

//退款接口
exports.refundOrder = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.err('未传入内容');
    }
    const sql = 'update feast_order set order_status = 2 where oid = ?';
    db.query(sql, data.order_id, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('更新退款失败')
        }
        const sql1 = 'insert into refund set ?';
        db.query(sql1, data, (err, result1) => {
            if (err) {
                return res.err(err);
            }
            if (result1.affectedRows !== 1) {
                return res.err('增加退款信息失败')
            }
            res.send({
                code: 0,
                message: 'success'
            })
        })
    })

}

//获取退款信息
exports.getRefundMessage = (req, res) => {
    const oid = req.query.oid;
    if (!oid) {
        return res.err('未传入指定的OID');
    }
    const sql = 'select * from refund where order_id = ?';
    db.query(sql, oid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.err('暂无数据');
        }
        res.send({
            code: 0,
            message: 'success',
            data: result[0]
        })
    })
}

//确认退款
exports.allowRefund = (req, res) => {
    const oid = req.query.oid;
    if (!oid) {
        return res.err('未传入OID');
    }
    const sql = 'update feast_order set order_status = 3 where oid = ?';
    db.query(sql, oid, (err, result) => { 
        if (err) {
            return res.err(err);
        }
        if(result.affectedRows !== 1){
            return res.err('确认退款失败！')
        }
        res.send({
            code:0,
            message:'allow refund success'
        })
    })
}

//驳回
exports.rejectRefund = (req, res) => {
    const oid = req.query.oid;
    if (!oid) {
        return res.err('未传入OID');
    }
    const sql = 'update feast_order set order_status = 1 where oid = ?';
    db.query(sql, oid, (err, result) => { 
        if (err) {
            return res.err(err);
        }
        if(result.affectedRows !== 1){
            return res.err('驳回退款失败！')
        }
        res.send({
            code:0,
            message:'reject refund success'
        })
    })
}

//完成订单
exports.completeOrder = (req, res) => {
    const oid = req.query.oid;
    if (!oid) {
        return res.err('未传入OID');
    }
    const sql = 'update feast_order set order_status = 4 where oid = ?';
    db.query(sql, oid, (err, result) => { 
        if (err) {
            return res.err(err);
        }
        if(result.affectedRows !== 1){
            return res.err('完成订单失败！')
        }
        res.send({
            code:0,
            message:'complete refund success'
        })
    })
}
