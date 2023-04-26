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

module.exports.update = function (req, res) {

    if (req.user.id == req.params.id) {
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id, req.body)
            .then((user) => {
                return res.redirect('back');
            })
            .catch((err) => {
                console.log(err);
                return res.redirect('back');
            })
    } else {
        return res.status(401).send('Unauthorized');
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

module.exports.create = function (req, res) {

    if (req.body.password != req.body.confirm_password) {
        console.log("password and confirm_password not matches ");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })//find the user by email
        .then((user) => {
            // if user not found
            if (!user) {
                // create new user
                User.create(req.body)
                    .then(() => {
                        return res.redirect('/users/sign-in');
                    })
                    .catch((err) => { return console.log('error in creating user in signing up'); })
            } else {
                // return to back or sign-in page
                return res.redirect('back');
            }
        })
        // if err
        .catch((err) => {
            console.log('error in finding user in signing up');
            // return res.redirect('back');
            return;
        })
}

module.exports.createSession = (function (req, res) {
    return res.redirect('/');
});

// used logout and destroy session
module.exports.destroySession = function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }

        return res.redirect('/');
    });

}

