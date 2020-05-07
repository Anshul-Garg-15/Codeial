const User = require('../model/user');


module.exports.userProfile = function(req,res){
    // return respond.end('<h1>User Profile</h1>');
        //check user_id is present or not in the data     
        if(req.cookies.User_id){
            // console.log('user_id');
            //if user is present in the database then find the id from cookie
            User.findById(req.cookies.User_id , function(err,user){
                if(user){
                    //if user is present only then render the profile page
                    return res.render('user_profile',{
                        title:"User Profile",
                        user:user
                    });

                }
                //if user is not in the database
                return res.redirect('/user/sign-in');
            });
        }else{
            //if user_id is not in the database 
            return res.redirect('/user/sign-in');
        }
    }

    //to render sign up page
module.exports.sign_up = function(req,res){
    return res.render('user_sign_up',{
        title:"Sign Up"
    });
}

//to render sign in page
module.exports.sign_in = function(req,res){
    return res.render('user_sign_in',{
        title:"Sign In"
    });
}
//get the sign up data
module.exports.create = function(req,res){

    //check password and confirm password are match or not
    if(req.body.password != req.body.Confirm_Password){
        return res.redirect('back');
    }
    //find user in the database 
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding User while signing up'); return}
        
        if(!user){
            //if user is not present in the database then create the user
            User.create(req.body,function(err , user){
                if(err){console.log('Error in creating User while signing up'); return}
                return res.redirect('/user/sign-in');
            })
        }else{
            return res.redirect('back');
        }


    })
}


//sign in and create session
module.exports.createSession = function(req,res){
    //finding user email in the database
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in finding email while signing in');return}
        //if user found
        if(user){
            // if user found but password doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation if user found and password match
            res.cookie('User_id',user.id);
            return res.redirect('/user/profile');

        }else{
            //if user not found
            return res.redirect('back');
        }
    });


}
