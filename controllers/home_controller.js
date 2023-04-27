const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({}).populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
            .exec()

        let users = await User.find({})
        return res.render('home', {
            title: "posts",
            subtitle: "Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        return console.log("Err", err);
    }
}