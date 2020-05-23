const express = require('express');

const router = express.Router();

router.use('/post',require('./posts'));
router.use('/user',require('./user'));

module.exports = router;