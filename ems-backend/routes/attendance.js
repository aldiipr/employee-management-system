const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');


router.get(`/`, attendanceController.getAll);
router.get(`/:id`, attendanceController.getById);
router.post(`/`, attendanceController.create);
router.patch(`/:id`, attendanceController.update);


module.exports = router;