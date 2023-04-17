const User = require('../models/user');

module.exports.profile = function (req, res) {
    console.log(`request of user , ${req.path}`);
    // if(req.cookie)
    console.log(req.cookies);
    User.findOne({_id: req.cookies.user_id})
    .then((user)=>{
        // if user found
        if(user){

            return res.render('user_profile', {
                title: "user profile",
                subtitle: "User Profile",
                emoji: " :)",
                user:user
            });
        }else{
            // if user not found
            return res.redirect('/users/sign-in');
        }
    })
    .catch((err)=>{ return console.log("something wrong while getting user info", err);})
   
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

    User.findOne({ email: req.body.email })//find the user by email
        .then((user) => {
            // if user not found
            if (!user) {
                // create new user
                User.create(req.body)
                .then(()=>{
                    return res.redirect('/users/sign-in');
                })
                .catch( (err) =>{ return console.log('error in creating user in signing up'); })
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

/*
// used to login 
module.exports.createSession = function (req, res) {
    // steps to authenticate
    // find the user
    User.findOne({email: req.body.email})
    .then((user)=>{
        if(user.password != req.body.password){
            return res.redirect('back');
        }

        if(user){
            res.cookie('user_id', user.id)//uer_id also works
            return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    })

    .catch((err)=>{ return console.log("error in finding user in sign in", err);})
}


//removing cookies
module.exports.deleteSeccion = function(req, res) {
    // Clear the 'user_id' cookie
    res.clearCookie('user_id');
    return res.redirect('/users/profile');
    // return res.redirect('/users/sign-in');
  }

*/


