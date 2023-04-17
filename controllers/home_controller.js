module.exports.home = function(req, res){
    console.log(`request for, ${req.path}`);
    // console.log('cookires:', req.cookies);
    return res.render('home',{
        title:"posts",
        subtitle: "Home"
    });
}