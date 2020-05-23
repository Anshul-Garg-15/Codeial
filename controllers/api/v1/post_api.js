
const Post = require('../../../model/post');
const Comment = require('../../../model/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({}).sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    
    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroy = async function(req,res){
    try{

        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
         if(post.user == req.user.id){
            post.remove();

          await Comment.deleteMany({post:req.params.id});
        //   if(req.xhr){
        //     //return in JSOn form with status
        //     return res.status(200).json({
        //         data: {
        //             post_id: req.params.id
        //         },
        //         message:"Post Deleted!"

        //     });
        // }
        //   req.flash('success' , 'Post and associated comment deleted');
 
          return res.json(200,{
              message: "Post and comment deleted"
          });
        }else{
             return res.json(402,{
                 message: 'You cannot delete this post'
             })
         }

    }catch(err){
        console.log('errr',err)
        // req.flash('error',err);
        return res.json(500,{
            message: "Internal Server Error"
        });
    }
    
}