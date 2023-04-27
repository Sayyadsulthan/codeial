const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {

    Post.find({}).populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec()

        .then((posts) => {
            User.find({})
                .then((users) => {
                    return res.render('home', {
                        title: "posts",
                        subtitle: "Home",
                        posts: posts,
                        all_users: users
                    });
                })

        })
        .catch((err) => {
            return console.log("error while fetching user from home_controller", err);
        })

}