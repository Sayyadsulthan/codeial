const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
        .then((user) => {

            return res.render('user_profile', {
                title: "user profile",
                subtitle: "User Profile",
                emoji: " :)",
                profile_user: user

            });
        })
}

//update the user info
module.exports.update = async function (req, res) {

    try {
        if (req.user.id == req.params.id) {
            console.log(req.body);
            await User.findByIdAndUpdate(req.params.id, req.body)
            req.flash('success', 'User profile Updated..')
            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}

// render the sign up page
module.exports.signup = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signup', {
        title: "sign up"
    })
}

// render the sign in page
module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_signin', {
        title: "sign in"
    })
}

//creating the user
module.exports.create = async function (req, res) {

    try {
        if (req.body.password != req.body.confirm_password) {
            console.log("password and confirm_password not matches ");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email })//find the user by email
        // if user not found
        if (!user) {
            // create new user
            await User.create(req.body)
            return res.redirect('/users/sign-in');
        } else {
            // return to back or sign-in page
            return res.redirect('back');
        }
    } catch (err) {
        return console.log("Error", err);
    }

}


module.exports.createSession = (function (req, res) {
    req.flash('success', 'seccessfully logged in');
    return res.redirect('/');
});

// used logout and destroy session
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        req.flash('success', 'You have logged out !');
        return res.redirect('/');
    });

}

