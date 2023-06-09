const mongoose = require('mongoose');

let friendshipSchema = new mongoose.Schema({

    // the  user who sends the request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    // the user who accepted this request, the naming is just to understand, otherwise, the user won't see the difference
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 

},{
    timestamps: true
})


const friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = friendship;