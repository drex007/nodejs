const express = require('express')
const router = express.Router()
const logoutController  = require('../controllers/logoutController');
//require('crypto').randomBytes(64).toString('hex')
router.get('/', logoutController.handleLogout);

module.exports = router;