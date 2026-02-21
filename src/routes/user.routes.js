const express = require('express');
const auth = require('../middleware/authorization');
const {createUser, login, verifyUser, updateUserById} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/register', createUser); //localhost:3000/users/register
userRouter.post('/login', login); //localhost:3000/users/login
userRouter.get('/verify-user', auth, verifyUser); //localhost:3000/users/verify-user
userRouter.put('/update', auth, updateUserById); //localhost:3000/users/update

module.exports = userRouter;