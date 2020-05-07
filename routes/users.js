const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/profile' , userController.userProfile);
router.get('/sign-up' , userController.sign_up);
router.get('/sign-in' , userController.sign_in);
router.post('/create' , userController.create);
router.post('/create-session', userController.createSession);
module.exports = router;