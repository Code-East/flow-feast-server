const express = require('express');
const expressJoi = require('@escook/express-joi')
const { public_feast_schema } = require('../schema/feast_schema');
const { 
    getFeastTeamList,
    getFeastList, 
    getPersonalFeast, 
    publicFeast,
    checkFeast,
    deleteFeast,
    updataFeast,
    getTeamFeast,
    paymentFeast,
    completeFeast,
    alipay
} = require('../router_handler/feast_handler');

const router = express.Router();

router.get('/get_feast_team_list', getFeastTeamList);
router.get('/get_feast_list', getFeastList);
router.get('/get_personal_feast',getPersonalFeast);
router.post('/public_feast',expressJoi(public_feast_schema),publicFeast);
router.get('/check_feast',checkFeast);
router.delete('/delete_feast',deleteFeast);
router.post('/update_feast',updataFeast);
router.get('/get_team_feast',getTeamFeast);
router.post('/payment_feast',paymentFeast);
router.post('/alipay',alipay);
router.get('/complete_feast',completeFeast);
module.exports = router;