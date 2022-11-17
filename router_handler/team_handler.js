const db = require("../dao");

//获取团队信息
exports.getTeamById = (req, res) => {
    const id = req.query.id;

    res.send({
        code: 0,
        message: 'success',

    })
}
//修改团队信息
exports.setTeamData = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.err('提交失败，未传入修改信息');
    }
    const sql = 'update feast_team set ? where tid = ?';
    db.query(sql, [data, data.tid], (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('修改失败，请联系管理员')
        }
        res.send({
            code: 0,
            message: 'submit success',
        })
    })

}

//获取团队成员
exports.getTeamPerson = (req, res) => {
    const data = req.query;
    if (!data) {
        return res.err('获取员工出错啦，没传入对应参数')
    }
    const { id, currentPage, pageSize } = data;
    const sql = 'select count(*) as total from employee where team_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 1) {
            return res.err('暂无数据');
        }
        const total = result[0].total;
        const start = (currentPage - 1) * pageSize;
        const sql1 = 'select * from employee where team_id = ? limit ' + start + ',' + pageSize + '';
        db.query(sql1, id, (err, result1) => {
            if (err) {
                return res.err(err);
            }
            if (result1.length < 1) {
                return res.err('暂无数据');
            }
            res.send({
                code: 0,
                message: 'success',
                data: {
                    employeeList: result1,
                    total
                }
            })
        })

    })
}

//增加员工
exports.addEmployee = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.err('增加失败，未传入员工信息')
    }
    const sql1 = 'select * from employee where name = ?'
    db.query(sql1, data.name, (err, result1) => {
        if (err) {
            return res.err(err);
        }
        if (result1.length > 0) {
            return res.err('已存在名为' + data.name + '的员工，请重新添加')
        }
        const sql = 'insert into employee set ?';
        db.query(sql, data, (err, result) => {
            if (err) {
                return res.err(err);
            }
            if (result.affectedRows !== 1) {
                return res.err('增加失败，请联系管理员')
            }
            res.send({
                code: 0,
                message: 'success',
            })
        })
    })

}

//根据eid获取员工的详细信息
exports.getEmployeeDetail = (req, res) => {
    const eid = req.query.eid;
    const sql = 'select * from employee where eid = ?';
    db.query(sql, eid, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.length < 0) {
            return res.err('查询失败，请联系管理员');
        }
        res.send({
            code: 0,
            message: 'success',
            data: result[0]
        })
    });
}

//修改员工信息
exports.uploadEmployee = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.err('编辑失败,未传入编辑对象')
    }
    const sql = 'update employee set ? where eid = ?';
    db.query(sql, [data, data.eid], (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('编辑失败,请联系管理员')
        }
        res.send({
            code: 0,
            message: 'success'
        })
    })
}

//删除员工信息
exports.deteleEmployee = (req, res) => {
    const id = req.query.eid;
    const sql = 'delete from employee where eid = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.err(err);
        }
        if (result.affectedRows !== 1) {
            return res.err('删除失败,请联系管理员');
        }
        res.send({
            code:0,
            message:'delete success'
        })
    })
}