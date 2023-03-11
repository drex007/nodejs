const express = require('express')
const router = express.Router()
const refreshTokenController  = require('../controllers/refreshTokenController');
//require('crypto').randomBytes(64).toString('hex')
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;