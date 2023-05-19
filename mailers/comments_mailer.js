const nodemailer = require('../config/nodemailer');


exports.newComment = (comment)=>{

    console.log("inside comment out: ", comment);
    nodemailer.transporter.sendMail({
        from:'projecttest62@gmail.com',
        to: comment.user.email,
        subject:'New comment Published',
        html:`<h1>hey, ${comment.user.name}  your comment published </h1>`
    }, (err, info)=>{
        if(err){console.log("err in sending mail...", err); return};

        console.log('Message sent......', info);
        return;
    })  
}