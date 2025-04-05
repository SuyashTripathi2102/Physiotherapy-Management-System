const express = require('express');
const {signupUser,loginUser} = require('../controllers/user-controller');
const router = express.Router();

//Signup(register)-
router.post('/signup',signupUser);

router.post('/login',loginUser);

module.exports = router;

