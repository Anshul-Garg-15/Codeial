const Post = require('../model/post');
//import comment part to delete comment with the post
const Comment = require('../model/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user.id
    },function(err,post){
        if(err){console.log('Error in posting a post');return;}

        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id ,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id} , function(err){

                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}