const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
const cookeiParser = require('cookie-parser');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookeiParser());
// setting up static folder
app.use(express.static('./assets'));
// using the express-ejs-layouts library
app.use(expressLayouts);

// extract styles and pages from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// using the router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`error is in running express, ${err}`);
        return;
    }

    console.log(`express server is running on port: ${port}`);
})
