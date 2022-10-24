const express = require('express');
const { getUser } = require('../router_handler/user_handler');

const router = express.Router();
router.get('/getuser',getUser)

//导出
module.exports = router;