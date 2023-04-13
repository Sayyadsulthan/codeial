module.exports.home = function(req, res){
    console.log('home page');
    return res.render('home',{
        title:"posts",
        subtitle: "congrats :)"
    });
}