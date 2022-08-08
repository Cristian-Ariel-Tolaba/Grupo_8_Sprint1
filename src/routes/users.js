const express = require('express');
const router = express.Router();

/*  */
const { login, register, passwordReset } = require('../controllers/userController');

/* /users */
router
  .get('/login', login )
  .get('/register', register)
  .get('/passwordReset', passwordReset)



module.exports = router;