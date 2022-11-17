const express = require('express');
const expressJoi = require('@escook/express-joi');
const { getTeamById, setTeamData, getTeamPerson, addEmployee, getEmployeeDetail, uploadEmployee, deteleEmployee } = require('../router_handler/team_handler');
const { add_employee_scheam, update_employee_scheam } = require('../schema/team_scheam');

const router = express.Router();
router.get('/get_team_data', getTeamById);
router.post('/set_team_data', setTeamData);
router.get('/get_team_person', getTeamPerson);
router.post('/add_employee', expressJoi(add_employee_scheam), addEmployee);
router.get('/get_employee_detail', getEmployeeDetail);
router.post('/upload_employee', expressJoi(update_employee_scheam), uploadEmployee);
router.delete('/delete_employee', deteleEmployee);

module.exports = router;