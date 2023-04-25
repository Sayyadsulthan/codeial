const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.user);
     console.log(`request for, ${req.path}`);
    // console.log('cookires:', req.cookies);

    //to populate the user of each post
    Post.find({}).populate('user').exec()

    .then((posts)=>{
        return res.render('home',{
            title:"posts",
            subtitle: "Home",
            posts: posts
        });
    })
       .catch((err)=>{
            return console.log("error while fetching user from home_controller", err);
        })

        
  
    

    // Post.find({})
    //     .then((posts)=>{ 

    //         return res.render('home',{
    //             title:"posts",
    //             subtitle: "Home",
    //             posts: posts
    //         });
    //     })
    //         .catch((err)=>{
    //             return console.log("error while fetching user from home_controller", err);
    //         })

    
    // console.log(`request for, ${req.path}`);
    // console.log('cookires:', req.cookies);
    // return res.render('home',{
    //     title:"posts",
    //     subtitle: "Home"
    //     User: user
    // });
    

}