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