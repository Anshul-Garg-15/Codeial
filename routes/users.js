const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

//profile is only visible when user is signed in
router.get('/profile/:id' , passport.checkAuthentication ,  userController.userProfile);
router.post('/update/:id' , passport.checkAuthentication ,  userController.update);
router.get('/sign-up' , userController.sign_up);
router.get('/sign-in' , userController.sign_in);
router.post('/create' , userController.create);

router.get('/sign-out' , userController.destroySession);

//authenticate using passport and use passport as a middleware

router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'}
 ) , userController.createSession);


router.get('/auth/google' , passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google' , {failureRedirect: '/user/sign-in'}), userController.createSession);


 module.exports = router;
