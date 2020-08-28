const express = require('express');
const router = express.Router();

const controller = require('../controllers/room.controller');

router.get('/get', controller.get);

router.post('/create', controller.create);

router.post('/register', controller.register);

router.post('/search', controller.search);

module.exports = router;
