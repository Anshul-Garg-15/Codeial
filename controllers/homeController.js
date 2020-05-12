const Post = require('../model/post');
const User = require('../model/user');
module.exports.home = async function(request , respond){
    // return respond.end('<h1>Express Server is Running</h1>');
    // console.log(request.cookies);
    // respond.cookie("User Id" , 25);
   try{
       //finding the post and show it on the home page with user details
    //call back function in exec
    let posts = await Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    //to find all users to render it home page as user friends and send all the users by allUsers property
    let users = await User.find({});

        return respond.render('home',{
            title: "Codeial | Home",
            post:posts,
            allUsers:users
        });

   }catch(err){
       console.log('Error',err);
       return;

   }
    
}