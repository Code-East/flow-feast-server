const express = require('express');
const { getFeastTeamList,getFeastList, getNameList} = require('../router_handler/feast_handler');

const router = express.Router();

router.get('/get_feast_team_list', getFeastTeamList);
router.get('/get_feast_list', getFeastList);
router.get('/get_name_list', getNameList);

module.exports = router;