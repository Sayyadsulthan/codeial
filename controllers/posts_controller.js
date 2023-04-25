const Post = require('../models/post');
const Posts = require('../models/post');


module.exports.create= function(req, res){

    
    // if(req.isAuthenticated()){

        console.log(req.user);
            Posts.create({
                    content:req.body.content,
                    user: req.user._id
                })
            .then(()=>{ return res.redirect('back');})

            .catch((err)=>{ return console.log("error in creating post: ", err)})
    // }else{

    //     return res.redirect('back');
    // }
     
    
}