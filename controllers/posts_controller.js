const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = async function (req, res) {
    // if(req.isAuthenticated()){
    // console.log(req.user);
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                },
                message: "Post created!"

            })
        }

        req.flash('success', 'post published!')
        return res.redirect('back');
    } catch (err) {
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
            await Comment.deleteMany({ post: req.params.id })//deletes many comments from Comment Schema

            // if the request is xhr then it will be passed to ajax
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "post deleted"
                });
            }

            req.flash('success', 'post deleted successfully');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err)
        return res.redirect('back');
    }
}