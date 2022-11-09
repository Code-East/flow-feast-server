const { consumers } = require('nodemailer/lib/xoauth2');
const db = require('../dao/index')

//获取header列表
exports.getHeadList = (req, res) => {
    const userinfo = req.auth;
    let headerList;
    if (userinfo.userType === '0') {
        headerList = [
            { path: '/index/feast_team_page', name: '首页', icon: 'House' },
            { path: '/index/chat', name: '联系', icon: 'ChatSquare' },
            { path: '/index/public_feast_page', name: '宴席管理', icon: 'Dish' },
            { path: '/index/personal', name: '个人中心', icon: 'User' },
        ]
    } else if (userinfo.userType === '1') {
        headerList = [
            { path: '/index/feast_list_page', name: '首页', icon: 'House' },
            { path: '/index/chat', name: '联系', icon: 'ChatSquare' },
            { path: '/feast_team_admin', name: '团队管理', icon: 'User' },
        ]
    } else {
        return res.err('用户类型有误！');
    }
    res.send({
        code: 0,
        data: headerList,
        message: 'success'
    })
}
//获取Aside的数据
exports.getAsideData = (req, res) => {
    const userinfo = req.auth;
    if (!userinfo) {
        return res.err('用户未登入！')
    }
    if (userinfo.userType == '0') { //用户为个人用户
        //获取用户发布的宴席数和举办宴席所花费的钱
        const sql = 'select count(fid) as feastCount from feast where user_id = ?';
        db.query(sql, userinfo.uid, (err, result1) => {
            if (err) {
                return res.err(err);
            }
            if (result1.length < 0) {
                return res.err('查询失败！')
            }
            const s = 'select sum(price) as price from feast_order where user_id = ?';
            db.query(s, userinfo.uid, (err, result2) => {
                if (err) {
                    return res.err(err);
                }
                if (result2.length < 1) {
                    return res.send({
                        code: 0,
                        message: 'success',
                        data: {
                            feastCount: result1[0].feastCount,
                            price: 0
                        }
                    })
                }
                res.send({
                    code: 0,
                    message: 'success',
                    data: {
                        feastCount: result1[0].feastCount,
                        price: result2[0].price
                    }
                })
            })

        });
    } else if (userinfo.userType == '1') { //用户为团队用户
        //获取团队承办的宴席数和金额
        const sql = 'select count(oid) as feastCount,sum(price) as price from feast_order where team_id = ?';
        db.query(sql, userinfo.tid, (err, result) => {
            if (err) {
                return res.err(err);
            }
            if (result.length < 0) {
                return res.err('查询失败！')
            }
            res.send({
                code: 0,
                message: 'success',
                data: result[0]
            })
        });
    } else {
        return res.err('用户类型错误！')
    }

}