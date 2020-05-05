const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/' , homeController.home);
router.use('/user', require('./users'));


module.exports = router;