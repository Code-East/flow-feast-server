const db = require('../dao/index');

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
        const sql2 = 'select * from feast where online=1 limit ' + start + ',' + pageSize + '';
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

exports.getNameList = (req, res) => {
    const uid = req.query.uid;
    //根据发布宴席的用户id 找到对应用户的nickname 并加入结果中
    const sql3 = 'select nickname from user where uid = ?';
    db.query(sql3, uid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        const nickname = result[0].nickname;
        res.send({
            code: 0,
            message: 'success',
            nickname
        })
    })

    // console.log(list);
    
}