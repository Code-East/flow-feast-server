const db = require('../dao/index');

exports.getUser = (req,res) => {
    const sql = 'select * from user';
    db.query(sql,(err,result)=>{
        if (err) {
            console.log(err);
            return;
        }
        if (result.length < 1) {
            console.log('err');
        }
        res.send({
            data: result,
            message:'success!'
        })
    })
}