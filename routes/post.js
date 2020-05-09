const express = require('express');
const router = express.Router();
const passport = require('passport'); 
const postController = require('../controllers/postController');


//able to create the post only if user signed in
router.post('/create' ,passport.checkAuthentication, postController.create)


module.exports = router;