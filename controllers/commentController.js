const Comment = require('../model/comment');
const Post = require('../model/post')

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user.id
            },function(err,comment){
                //handle the error
                post.comments.push(comment);
                post.save();
                req.flash('success','Add comment successfully');
                res.redirect('/');

            });
        }

    });
}

module.exports.destroy = function(req,res){

   

    Comment.findById(req.params.id , function(err,comment){
        if(comment)
        {
            console.log("comment found ",comment);
            Post.findById(comment.post,function(err,post)
            {
                if(post)
                {
                    console.log("post found ",post);
                    if(comment.user == req.user.id || req.user.id==post.user){

                        let postId = comment.post;
                        comment.remove();
                        Post.findByIdAndUpdate(postId , {$pull : {comments:req.params.id}},function(err,post){
                            req.flash('success' , 'Comment deleted');
                            return res.redirect('back');
                        })
                    }else{
                        req.flash('error','You cannot delete this comment');
                        return res.redirect('/');
                    }
                }
            })  
        }
    });
}