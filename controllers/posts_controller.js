const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create =async function (req, res) {
    // if(req.isAuthenticated()){
    // console.log(req.user);
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })
             return res.redirect('back'); 
    }catch(err){
        return console.log("error in creating post: ", err);
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            //to delete post
            Post.deleteOne(post)//delete the post in Post Schema
                .then(() => {
                    console.log("post deleted successfully")
                })

            //to delete comments related to post
            Comment.deleteMany({ post: req.params.id })//deletes many comments from Comment Schema
                .then(() => {
                    req.flash('success', 'post deleted successfully');
                    return res.redirect('back');
                })
        }
    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');
    }
}