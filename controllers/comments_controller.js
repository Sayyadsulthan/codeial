const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create= function(req, res){

    try{
        Post.findById(req.body.post)
        .then((post)=>{
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id

                })
                .then((comment)=>{
                    post.comments.push(comment);
                    post.save();

                    res.redirect('/');//return to home page 
                })

                .catch((err)=>{
                    return console.log("error while creating the comment", err);
                })
            }
        })
    }catch(err){
        console.log(err);
    }
}