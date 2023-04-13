const express = require('express');
const port = 8000;
const app = express();
// const path = require('path');
// using the middleware
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
