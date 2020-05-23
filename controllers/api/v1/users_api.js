const User = require('../../../model/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){

    try{

        let user = await User.findOne({email:req.body.email});

    if(!user || user.password != req.body.password){
        return res.json(422,{
            messsage: "Invalid usernme or password"
        });
    }
    return res.json(200,{
        message: "Sign In successfully,keep your token safe",
        //create token
        data: {
            //this set the token and send it to the user
            token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '100000'})
        }
    });

    }catch(err){
        console.log('error',err)
        return res.json(500,{
            message: 'Internal server error'
        });
    }
    
}