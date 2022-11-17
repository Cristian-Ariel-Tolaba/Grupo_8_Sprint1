const express = require('express');
const router = express.Router();

const { login,processLogin, register,processRegister, passwordReset, profile, updateProfile, logout } = require('../controllers/userController');

const uploadUser = require('../middlewares/upLoadFilesUser');

const {loginValidator, registerValidator, profileValidator} = require('../validations');

const userSessionCheck = require('../middlewares/userSessionCheck');

/* /users */
router
  .get('/login', login )
  .post('/login', loginValidator, processLogin)
  .get('/register', register)
  .post('/register', uploadUser.single('avatar'), registerValidator, processRegister) 
  .get('/passwordReset', passwordReset)
  .get('/profile', userSessionCheck, profile)  
  .put('/profile',uploadUser.single('avatar'), profileValidator, updateProfile)
  .get('/logout', logout)


module.exports = router;