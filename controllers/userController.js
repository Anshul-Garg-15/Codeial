const User = require('../model/user');


module.exports.userProfile = function(request,respond){
    // return respond.end('<h1>User Profile</h1>');
    return respond.render('user_profile',{
        title:""
    });
}
//to render sign up page
module.exports.sign_up = function(req,res){

    //if the user is already present then dont need to render sign up page to user
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    } 

    return res.render('user_sign_up',{
        title:"Sign Up"
    });
}

//to render sign in page
module.exports.sign_in = function(req,res){

    //if the user is already signed in then dont need to render sign in page to user
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
        title:"Sign In"
    });
}
//get the sign up data
module.exports.create = function(req,res){

    console.log(req.body);
    if(req.body.password != req.body.Confirm_Password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding User while signing up'); return}
        if(!user){
            User.create(req.body,function(err , user){
                if(err){console.log('Error in creating User while signing up'); return}
                return res.redirect('/user/sign-in');
            })
        }else{
            return res.redirect('back');
        }


    })
}


//sign in and create session using passport middleware
module.exports.createSession = function(req,res){
    // console.log("user create session");
    // return res.render('user_profile',{
    //     title:"Codeial/Profile"
    // });  
    return res.redirect('/');
}

//remove the session cookie
module.exports.destroySession = function(req,res){
    
    //logout the session using passport library
    req.logout();
    return res.redirect('/');
}