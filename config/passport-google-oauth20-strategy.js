const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

//tell passport to use this google strategy
passport.use(new googleStrategy({
    clientID:"957902057866-0re9lg9un1354ll35mr1r6j2ktemhlad.apps.googleusercontent.com",
    clientSecret:"rU5QvnghtPTsd6l3yW8DejTy",
    callbackURL:"http://localhost:8002/user/auth/google/callback"
},

    function(accessToken , refreshToken , profile, done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google-oauth',err);
                return;
            }
            console.log(accessToken , refreshToken);
            console.log(profile);
            //if found , then set as req.user
            if(user){
                return done(null,user);
            }else{
                //if not then create user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){

                    if(err){
                        console.log('Error in google-oauth',err);
                        return;
                    }
                    return done(null,user);
                    
                });
            }
        })
    }




));

module.exports = passport;