const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/profile' , userController.user);
router.get('/sign-up' , userController.sign_up);
router.get('/sign-in' , userController.sign_in);
// router.post('/create' , userController.create);

module.exports = router;