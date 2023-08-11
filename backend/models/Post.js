// Import the mongoose module for defining schemas and creating models
const mongoose = require('mongoose');

// Define the schema for posts
const postSchema = new mongoose.Schema({
    // Reference to the user who created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Content/text of the post with a maximum length of 140 characters
    content: {
        type: String,
        required: true,
        maxlength: 140
    },
    // Timestamp indicating when the post was created
    date: {
        type: Date,
        default: () => Date.now()
    },
    // Reference to another post if this post is a reply
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    // Array of users who liked the post
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Array of users who retweeted the post
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Array of posts that are replies to this post
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    // Array of hashtags found within the post content
    hashtags: [{
        type: String
    }],
    // Optional URL to an image associated with the post
    pictureURL: {
        type: String,
        default: ""
    }
});

// Middleware executed before saving the post; extracts hashtags from content
postSchema.pre('save', function(next) {
    // Extract hashtags using a regular expression
    const content = this.content;
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const hashtags = content.match(hashtagRegex) || [];
    
    // Remove the '#' prefix and assign to the post's hashtags field
    this.hashtags = hashtags.map(tag => tag.slice(1));

    next();
});

// Create a mongoose model based on the post schema
const Post = mongoose.model('Post', postSchema);

// Export the Post model for use in other parts of the application
module.exports = Post;
