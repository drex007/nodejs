const express = require('express')
const router = express.Router()
const authController  = require('../controllers/authController');
//require('crypto').randomBytes(64).toString('hex')
router.post('/', authController.handleLogin);

module.exports = router;