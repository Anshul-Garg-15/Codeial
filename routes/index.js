const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/' , homeController.home);
router.use('/user', require('./users'));
router.use('/post', require('./post'));
router.use('/comment',require('./comment'));

module.exports = router;