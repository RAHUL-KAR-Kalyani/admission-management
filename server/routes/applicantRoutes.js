const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const { createApplicant, verifyDocuments, getAllApplicants } = require('../controllers/applicantController');

const applicantRouter = express.Router();

applicantRouter.post('/create', isAuth, createApplicant);
applicantRouter.patch('/update/:id', isAuth, verifyDocuments);
applicantRouter.get('/get', isAuth, getAllApplicants)


module.exports = applicantRouter;