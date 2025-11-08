const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departmentsController');


router.get(`/`, departmentsController.getAll);
router.get(`/:id`, departmentsController.getById);
router.post(`/`, departmentsController.create);
router.patch(`/:id`, departmentsController.update);
router.delete(`/:id`, departmentsController.delete);


module.exports = router;
