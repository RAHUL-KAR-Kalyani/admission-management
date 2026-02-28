const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const { createInstitute, getAllInstitute } = require('../controllers/institutionController');

const instituteRouter = express.Router();

instituteRouter.post('/create', isAuth, createInstitute);
instituteRouter.get('/get', isAuth, getAllInstitute);
// instituteRouter.get('/get/:id', isAuth, getInstituteById);
// instituteRouter.patch('/update/:id', isAuth, updateInstitute);
// instituteRouter.delete('/delete/:id', isAuth, deleteInstitute);


module.exports = instituteRouter;