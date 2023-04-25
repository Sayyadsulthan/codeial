const mongoose = require('mongoose');

const postSchema =new  mongoose.Schema({
    content:{
        type: String,
        reqired: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //refers to the Users Schema
    }
},{
    timestamps:true
})

const Post=  mongoose.model('Post', postSchema);

module.exports= Post;