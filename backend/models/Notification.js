// Import the mongoose module for schema definition and model creation
const mongoose = require('mongoose');

// Define the schema for notifications
const notificationSchema = new mongoose.Schema({
    // Reference to the user receiving the notification
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Reference to the post associated with the notification (if applicable)
    post: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    // Type of notification (like, follow, reply)
    type: { 
        type: String,
        enum: ["like", "follow", "reply"],
        required: true
    },
    // User who triggered the notification (e.g., someone who liked a post)
    triggeredBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Boolean flag to indicate if the notification has been read
    isRead: {
        type: Boolean,
        default: false
    },
    // Timestamp indicating when the notification was generated
    date: { 
        type: Date,
        default: () => Date.now()
    }
});

// Create a mongoose model based on the notification schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the Notification model for use in other parts of the application
module.exports = Notification;
