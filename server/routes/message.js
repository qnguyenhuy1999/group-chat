const express = require('express');
const router = express.Router();

const controller = require('../controllers/message.controller');

router.post('/get', controller.get);

router.post('/create', controller.create);

module.exports = router;
