const express = require('express');
const { createDepartment, getAllDepartment } = require('../controllers/departmentController');
const isAuth = require('../middleware/authMiddleware');

const departmentRouter = express.Router();

departmentRouter.post('/create', isAuth, createDepartment);
departmentRouter.get('/get', isAuth, getAllDepartment);
// departmentRouter.patch('/update/:id', isAuth, updateDepartment);
// departmentRouter.delete('/delete/:id', isAuth, deleteDepartment);



module.exports = departmentRouter;