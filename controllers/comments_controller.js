const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = function (req, res) {

    try {
        Post.findById(req.body.post)
            .then((post) => {
                if (post) {
                    Comment.create({
                        content: req.body.content,
                        post: req.body.post,
                        user: req.user._id

                    })
                        .then((comment) => {
                            post.comments.push(comment);
                            post.save();

                            res.redirect('/');//return to home page 
                        })

                        .catch((err) => {
                            return console.log("error while creating the comment", err);
                        })
                }
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports.destroy = (req, res) => {
    try {
        Comment.findById(req.params.id)
            .then((comment) => {
                if (comment.user == req.user.id) {

                    let postId = comment.post;
                    //deleting comment from commentSchema
                    try {

                        Comment.deleteOne(comment)
                            .then(() => {
                                console.log("comment deleted succesfully ");
                            })
                    } catch (err) {
                        console.log(err);
                    }

                    //update the comments in postSchema
                    // try{
                        Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id} })
                        .then((post)=>{
                            console.log("post comment deleted successfully..", post);
                            return res.redirect('back');
                        })

                        .catch((err)=>{
                            console.log(err);
                            return res.redirect('back');
                        })
                    // }catch(err){
                    //     console.log(err);
                    //     return res.redirect('back');
                    // }
                }else{
                    console.log("error in deleting");
                    return res.redirect('back');
                }
                   

            })
    } catch (err) {
        console.log("error while fetching comment: ", err);
        return res.redirect('back');
    }
}