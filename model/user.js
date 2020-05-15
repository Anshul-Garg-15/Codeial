const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatar_path = path.join('/uploads/users/avatars');

const userSchema = mongoose.Schema({
    email : {
        type:String,
        required: true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    avatar: {
        type: String
    }


},{
    timestamps:true
});

// this function help us to storing file on disk
//cb -> call back
//Date.now -> note the time of uploading file(Append current time with filename)
let storage = multer.diskStorage({
    destination: function(req,filename,cb){
        cb(null , path.join(__dirname, '..', avatar_path));
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now());
        //fieldname is avatar from schema
    }
});
//static methods
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar'); //in this we attach diskstorage in storage property

userSchema.statics.avatarpath = avatar_path; //this makes path available publically

const User = mongoose.model('User' , userSchema);

module.exports = User;

