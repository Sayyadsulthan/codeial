const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create= function(req, res){

    
    // if(req.isAuthenticated()){

        console.log(req.user);
            Post.create({
                    content:req.body.content,
                    user: req.user._id
                })
            .then(()=>{ return res.redirect('back');})

            .catch((err)=>{ return console.log("error in creating post: ", err)})
    // }else{

    //     return res.redirect('back');
    // }
     
    
}

module.exports.destroy = function (req, res) {
    try {
        Post.findById(req.params.id)
            .then((post) => {
                if (post.user == req.user.id) {
                    //to delete post
                    try{
                        Post.deleteOne(post)//delete the post in Post Schema
                        .then(()=>{
                            console.log("post deleted successfully")
                        })
                    }catch(err){
                        console.log("error in deleting a post: ",err);
                    }

                    //to delete comments related to post
                    try {
                        Comment.deleteMany({ post: req.params.id })//deletes many comments from Comment Schema
                            .then(() => {
                                return res.redirect('back');
                            })
                    } catch (err) {
                        return console.log("err while deleting comment in post", err);
                    }
                }
            })

    } catch (err) {
        return res.redirect('back');
    }

}