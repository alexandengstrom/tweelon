const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
    followers: [{
        type: ObjectId,
        ref: "User"
    }],
    following: [{
        type: ObjectId,
        ref: "User"
    }],
    pictureURL: {
        type: String,
        default: ""
    },
    notifications: [{
        type: ObjectId,
        ref: "Notification"
    }]
});

module.exports = mongoose.model("User", userSchema);
