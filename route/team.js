const express = require('express');
const { getTeamById,setTeamData } = require('../router_handler/team_handler')
const router = express.Router();

router.get('/get_team_data',getTeamById);
router.post('/set_team_data',setTeamData);
module.exports = router;