const express = require('express');
const { getHeadList } = require('../router_handler/index_handler');

const router = express.Router();

router.get('/get_header_list',getHeadList);
module.exports = router;