const Post = require('../model/post');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    },function(err,post){
        if(err){console.log('Error in posting a post');return;}

        return res.redirect('back');
    });
}