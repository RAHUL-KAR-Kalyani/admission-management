const express = require('express');
const isAuth = require('../middleware/authMiddleware');
const { registerController, loginController, profileController, logoutController } = require('../controllers/userController');


const userRouter = express.Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);
userRouter.get('/profile', isAuth, profileController);
userRouter.get('/logout', isAuth, logoutController);

module.exports = userRouter;