// Import the mongoose module to define schemas and create models
const mongoose = require('mongoose');

// Define the schema for replies to posts
const replySchema = new mongoose.Schema({
    // Reference to the post this reply is associated with
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    // Reference to the user who created this reply
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Content/text of the reply with a maximum length of 140 characters
    content: {
        type: String,
        required: true,
        maxlength: 140
    },
    // Timestamp indicating when the reply was created
    date: {
        type: Date,
        default: () => Date.now()
    }
});

// Create a mongoose model based on the reply schema
const Reply = mongoose.model('Reply', replySchema);

// Export the Reply model for use in other parts of the application
module.exports = Reply;
