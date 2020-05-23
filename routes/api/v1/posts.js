const express = require('express');
const passport = require('passport');
const router = express.Router();
const Api = require('../../../controllers/api/v1/post_api');

router.get('/' , Api.index);
router.delete('/:id' , passport.authenticate('jwt',{session: false}),Api.destroy);

module.exports = router;