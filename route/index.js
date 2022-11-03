const express = require('express');
const { getHeadList,getAsideData } = require('../router_handler/index_handler');

const router = express.Router();

router.get('/get_header_list',getHeadList);
router.get('/get_aside_data',getAsideData);
module.exports = router;