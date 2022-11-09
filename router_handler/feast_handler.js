const db = require('../dao/index');
const { formatDate } = require('../utils/formateDate')
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

    const sql1 = 'select count(*) as total from feast';
    db.query(sql1, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result < 0) {
            return res.err('暂无数据');
        }
        const total = result[0].total;
        const sql2 = 'select a.*,b.nickname from feast a,user b where status=1 and a.user_id = b.uid limit ' + start + ',' + pageSize + '';
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
    const sql = 'select * from feast where fid = ?';
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
    db.query(sql,[feast,fid],(err, result)=>{
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows  !== 1) {
            return res.err('修改失败，请联系管理员');
        }
        res.send({
            code: 0,
            message: 'success',
        })
    })
    
}