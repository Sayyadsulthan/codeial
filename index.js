const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db= require('./config/mongoose');
const cookeiParser = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookeiParser());
// setting up static folder
app.use(express.static('./assets'));
// using the express-ejs-layouts library
app.use(expressLayouts);

// extract styles and pages from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// using the router
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`error is in running express, ${err}`);
        return;
    }

    console.log(`express server is running on port: ${port}`);
})
