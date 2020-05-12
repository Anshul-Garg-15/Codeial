const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                req.flash('error',err);
                return done(err);
            }

            if (!user || user.password != password){
                req.flash('error','Invalid UserName or Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check the user is authenticate
passport.checkAuthentication = function(req , res , next){
    //if the user is signed in then show the next page of the user means next request execute
    if(req.isAuthenticated()){
        return next();
    }
    //if the user not signed in

    return res.redirect('/user/sign-in');
}
//to send the user data to views if user is authenticated
//middleware
passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){

        //req.user contains the user data from the session cookies and we send this data to local
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;