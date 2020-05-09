const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    //this makes sure no post can be created without its user details
    user:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required:true,
    },

    //include the array of id of all comments in this post itself
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'

      }
        

    ]
},{
    timeStamps: true
});

const Post = mongoose.model('Post' , postSchema);

module.exports = Post;