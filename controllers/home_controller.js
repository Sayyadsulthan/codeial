module.exports.home = function(req, res){
    console.log('home page');
    return res.send('<h1> codeial is running now !!</h1>');
}