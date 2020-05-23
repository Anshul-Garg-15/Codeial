const express = require('express');
const app = express();
const port = 8002;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//require all for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashmiddleware'); //is there a flash middleware?yes 
//to store session cookie means user data permanently in the database

const mongoStore = require('connect-mongo')(session);//becz we require to store session data

//use sass for css and set some properties
// before deployment declare sass middleware at first by doing this its precompiled before running the server and whenever template wants then browser or template get precompiled files
app.use(sassMiddleware({

    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}));


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// extract css and scripts from the subpage to Layouts.ejs
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine', 'ejs');
app.set('views' , './views');

//middleware which takes the session cookie and encrypts it
//mongo store is used to store session cookie in db
app.use(session({
    //name of the cookie
    name: 'Codeial',
    //TODO set the secret before deploying the code 
    secret: 'something',
    saveUninitialized: false,
    resave:false,
    //expiring time of the session or cookie
    cookie:{
        maxAge: (1000 * 60 * 100)
    },

    //store session cookie in the memory so that when the server fire or user signed out then user data won't lose
    store: new mongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect mongo db setup ok');
    }

    )
}
));

app.use(passport.initialize());
app.use(passport.session());

//use flash here becoz it will be use in sessions
app.use(flash());
app.use(flashMiddleware.setFlash);
//whenever the passport initialize and session being used then the below function is also being set as a middleware

app.use(passport.setAuthenticatedUser);

//to express router
app.use('/' , require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is Running on : ${port}`);
});