const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();

            res.redirect('/');//return to home page    
        }
    } catch (err) {
        return console.log("Err: ", err);
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id)//to find the comment
        let post = await Post.findById(comment.post)//to find the post from comment

        if (comment.user == req.user.id || post.user == req.user.id) {

            let postId = comment.post;
            
            //deleting comment from commentSchema
            Comment.deleteOne(comment)
                .then(() => {
                    console.log("comment deleted succesfully ");
                })

            //update the comments in postSchema
            try {
                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
                    .then((post) => {
                        console.log("post comment deleted successfully..", post);
                        return res.redirect('back');
                    })
            } catch (err) {
                console.log(err);
                return res.redirect('back');
            }
        } else {
            console.log("error in deleting");
            return res.redirect('back');
        }
    } catch (err) {
        console.log("error while fetching comment: ", err);
        return res.redirect('back');
    }
}