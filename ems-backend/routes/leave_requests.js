const express = require('express');
const router = express.Router();
const leave_requestsController = require('../controllers/leave_requestsController');


router.get(`/`, leave_requestsController.getAll);
router.get(`/:id`, leave_requestsController.getById);
router.post(`/`, leave_requestsController.create);
router.patch(`/:id`, leave_requestsController.update);

module.exports = router;