const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');



router.get(`/`, employeesController.getAll);
router.get(`/:id`, employeesController.getById);
router.post(`/`, employeesController.create);
router.patch(`/:id`, employeesController.update);
router.delete(`/:id`, employeesController.delete);


module.exports = router;
