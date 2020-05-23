const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
//this extract header from passport-jwt
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../model/user');

let option = {

    //this extract jwt from header then token from passport-jwt
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //this is decryption key using codeial
    secretOrKey: 'codeial'
}

passport.use(new JwtStrategy(option , function(jwtPayloads,done){

    User.findById(jwtPayloads._id,function(err,user){

        if(err){connsole.log('Error in finding user',err);return;}

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }

    });

}));

module.exports = passport;