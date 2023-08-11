const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    hashtags: [{
        type: String
    }],
    pictureURL: {
        type: String,
        default: ""
    }
});

postSchema.pre('save', function(next) {
    const content = this.content;
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const hashtags = content.match(hashtagRegex) || [];
    this.hashtags = hashtags.map(tag => tag.slice(1));

    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
