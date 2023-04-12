const express = require('express');
const port = 8000;
const app = express();



app.listen(port, function(err){
    if(err){
        console.log(`error in running express, ${err}`);
        return;
    }

    console.log(`express server is running on port: ${port}`);
})
