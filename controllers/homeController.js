const Post = require('../model/post');

module.exports.home = function(request , respond){
    // return respond.end('<h1>Express Server is Running</h1>');
    // console.log(request.cookies);
    // respond.cookie("User Id" , 25);
   
    //finding the post and show it on the home page with user details
    //call back function in exec
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        if(err){console.log("error");return;}
        
        return respond.render('home',{
            title: "Codeial | Home",
            post:posts
        })
    })
}