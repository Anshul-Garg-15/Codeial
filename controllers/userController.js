// const User = require('../model/user');


module.exports.user = function(request,respond){
    // return respond.end('<h1>User Profile</h1>');
    return respond.render('user_profile',{
        title:""
    });
}
//to render sign up page
// module.exports.sign_up = function(req,res){
//     return res.render('user_sign_up',{
//         title:"Sign Up"
//     });
// }

//to render sign in page
// module.exports.sign_in = function(req,res){
//     return res.render('user_sign_in',{
//         title:"Sign In"
//     });
// }
//get the sign up data
// module.exports.create = function(req,res){

//     if(req.body.password != req.body.Confirm_Password){
//         return res.redirect('back');
//     }

//     User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log('Error in finding User while signing up'); return}
//         if(!user){
//             User.create(req.body,function(err , user){
//                 if(err){console.log('Error in creating User while signing up'); return}
//                 return res.redirect('/user/sign_in');
//             })
//         }else{
//             return res.redirect('back');
//         }


//     })
    

//     }


//sign in and create session
// module.exports.createSession = function(req,res){
    
// }
