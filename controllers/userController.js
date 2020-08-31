const User = require('../model/user');
const fs = require('fs');
const path = require('path');

module.exports.userProfile = function(request,respond){
    // return respond.end('<h1>User Profile</h1>');
    User.findById(request.params.id, function(err,user){

        return respond.render('user_profile',{
            title:"",
            profile_user:user
        });

    });    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id , req.body,function(err,user){
    //         req.flash('success' , 'Update Successfully');
    //         return res.redirect('back');

    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }


    if(req.user.id == req.params.id){
        try {
        
            let user = await User.findById(req.params.id);
            //by this we can get data from multitype form
            User.uploadedAvatar(req,res,function(err){

                if(err){console.log('Error in multer',err);return;}
                console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;


            if(req.file){
                //this delete another profile image 
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
                }
                //this is saving the path of uploaded file into avatar field name in user
                user.avatar = User.avatarpath + '/' + req.file.filename;

            }
            user.save();
            return res.redirect('back');
        });
    } catch (err) {
        req.flash('error',err);
        return res.redirect('back');
    }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized');
    }    
}
//to render sign up page
module.exports.sign_up = function(req,res){

    //if the user is already present then dont need to render sign up page to user
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    } 

    return res.render('user_sign_up',{
        title:"Sign Up"
    });
}

//to render sign in page
module.exports.sign_in = function(req,res){

    //if the user is already signed in then dont need to render sign in page to user
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
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
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }    
    });
}

//sign in and create session using passport middleware
module.exports.createSession = function(req,res){
    // console.log("user create session");
    // return res.render('user_profile',{
    //     title:"Codeial/Profile"
    // });
    //we will use custom middleware to send this flash to respond currently It is set in request like req.flash  
    req.flash('success' , 'Logged In Successfully');
    return res.redirect('/');
}

//remove the session cookie
module.exports.destroySession = function(req,res){
    
    //logout the session using passport library
    req.logout();
    req.flash('success' , 'Logged Out Successfully');
    return res.redirect('/');
}