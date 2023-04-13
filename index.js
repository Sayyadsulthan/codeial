const express = require('express');
const port = 8000;
const app = express();

// using the middleware
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`error is in running express, ${err}`);
        return;
    }

    console.log(`express server is running on port: ${port}`);
})
