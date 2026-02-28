const express = require('express');
const { seatAllocation, feeUpdate, confirmAdmission, getAllAdmissions } = require('../controllers/admissionController');
const isAuth = require('../middleware/authMiddleware');

const admissionRouter = express.Router();

admissionRouter.post("/create", isAuth, seatAllocation);
admissionRouter.patch("/fee-update/:id", isAuth, feeUpdate);
admissionRouter.patch("/confirm-admission/:id", isAuth, confirmAdmission);
admissionRouter.get("/get", isAuth, getAllAdmissions);

module.exports = admissionRouter;