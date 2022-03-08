const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/rate-limit');

router.post('/signup', userCtrl.createUser);
router.post('/login', limiter, userCtrl.loginUser);

module.exports = router;