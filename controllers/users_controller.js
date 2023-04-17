const User = require('../models/user');

module.exports.profile = function (req, res) {
    console.log(`request of user , ${req.path}`);
    return res.render('user_profile', {
        title: "user profile",
        subtitle: "User Profile",
        emoji: " :)"
    });
}

// render the sign up page
module.exports.signup = function (res, res) {
    return res.render('user_signup', {
        title: "sign up"
    })
}

// render the sign in page
module.exports.signin = function (res, res) {
    return res.render('user_signin', {
        title: "sign in"
    })
}

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        console.log("password and confirm_password not matches ");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding user in signing up');
            // return res.redirect('back');
            return;
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user in signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.createSession = function (req, res) {
    // steps to authenticate
    // find the user

}


