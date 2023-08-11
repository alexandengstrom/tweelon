const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 140
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
