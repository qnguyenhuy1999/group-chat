const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/login', controller.login);
router.get('/getUser', authMiddleware, controller.getUser);

module.exports = router;
