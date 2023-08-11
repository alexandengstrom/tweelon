// Import the necessary parts from the mongoose module
const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

// Define the schema for users
const userSchema = new Schema({
    // Name of the user with a minimum length of 6 characters
    name: {
        type: String,
        required: true,
        min: 6
    },
    // User's email, with specified minimum and maximum lengths
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    // User's password with security constraints on minimum and maximum lengths
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    // Timestamp indicating when the user was registered
    date: {
        type: Date,
        default: () => Date.now()
    },
    // List of posts the user has created
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
    // List of users following this user
    followers: [{
        type: ObjectId,
        ref: "User"
    }],
    // List of users this user is following
    following: [{
        type: ObjectId,
        ref: "User"
    }],
    // URL to the profile picture of the user
    pictureURL: {
        type: String,
        default: ""
    },
    // List of notifications associated with this user
    notifications: [{
        type: ObjectId,
        ref: "Notification"
    }]
});

// Create and export the User model based on the user schema
module.exports = mongoose.model("User", userSchema);
