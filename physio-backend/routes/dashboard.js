const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const authorizeRoles = require('../middlewares/roles-middleware');

router.get('/dashboard', authMiddleware, authorizeRoles('doctor', 'admin'), (req, res) => {
    const {username,role,id}=req.userInfo;
    res.status(200).json({
      success: true,
      message: `Welcome ${username}, role: ${role}`
    });
  });
  
  module.exports = router;
