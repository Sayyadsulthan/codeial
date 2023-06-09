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
const passportJwt = require('./config/passpoet-jwt-stratergy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore= require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("socket is listening on port : 5000");

app.use(express.urlencoded({extended:true}));

app.use(cookeiParser());
// setting up static folder 
app.use(express.static('./assets'));

// for uploading files make the uploads path available to brwoser
app.use('/uploads', express.static(__dirname + '/uploads'));

// using the express-ejs-layouts library
app.use(expressLayouts);

// extract styles and pages from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// mongostore is used to store the session in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            
            mongoUrl: "mongodb://127.0.0.1:27017/session",
            autoRemove: 'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


// using the router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`error is in running express, ${err}`);
        return;
    }

    console.log(`express server is running on port: ${port}`);
})
