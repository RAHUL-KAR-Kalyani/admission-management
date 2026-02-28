const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const { createProgram, getAllPrograms } = require('../controllers/programController');

const programRouter = express.Router();


programRouter.post('/create', isAuth, createProgram);
programRouter.get('/get', isAuth, getAllPrograms);
// programRouter.get('/get/:id', isAuth, getProgramById);
// programRouter.patch('/update/:id', isAuth, updateProgram);
// programRouter.delete('/delete/:id', isAuth, deleteProgram);

module.exports = programRouter;