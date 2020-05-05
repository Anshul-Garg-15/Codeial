const express = require('express');
const app = express();
const port = 8002;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(expressLayouts);

app.use(express.static('./assets'));
// extract css and scripts from the subpage to Layouts.ejs
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/' , require('./routes'));
app.set('view engine', 'ejs');
app.set('views' , './views');

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is Running on : ${port}`);
});