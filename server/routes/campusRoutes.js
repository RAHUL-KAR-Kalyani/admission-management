const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const { createCampus, getAllCampus } = require('../controllers/campusController');

const campusRouter = express.Router();

campusRouter.post('/create', isAuth, createCampus);
campusRouter.get('/get', isAuth, getAllCampus);
// campusRouter.get('/get/:id', isAuth, getCampusById);
// campusRouter.patch('/update/:id', isAuth, updateCampus);
// campusRouter.delete('/delete/:id', isAuth, deleteCampus);


module.exports = campusRouter;