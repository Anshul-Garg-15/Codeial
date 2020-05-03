const express = require('express');
const userCreateController = require('../controllers/createController');

const router = express.Router();

router.get('/create' , userCreateController.create);

module.exports = router;