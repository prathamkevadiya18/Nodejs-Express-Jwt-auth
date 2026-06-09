const express = require('express');
const router = express.Router();
const controller = require('../controller/addfinduser');
const auth = require('../middleware/auth');

router.get('/user', auth, controller.finduser);
router.post('/user', controller.adduser);
router.post('/login', controller.login);

module.exports = router;