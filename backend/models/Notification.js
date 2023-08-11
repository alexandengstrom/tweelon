const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    type: { 
        type: String,
        enum: ["like", "follow", "reply"],
        required: true
    },
    triggeredBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    date: { 
        type: Date,
        default: () => Date.now()
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
