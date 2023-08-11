const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http"); 
const socketIo = require("socket.io");

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const createPost = require("./routes/createPost");
const deletePost = require("./routes/deletePost");
const feed = require("./routes/feed");
const profileFeed = require("./routes/profileFeed");
const globalFeed = require("./routes/globalFeed");
const user = require("./routes/user");
const followUser = require("./routes/followUser");
const unfollowUser = require("./routes/unfollowUser");
const likePost = require("./routes/likePost");
const unlikePost = require("./routes/unlikePost");
const postReply = require("./routes/postReply");
const getReplies = require("./routes/getReplies");
const uploadProfilePicture = require("./routes/uploadProfilePicture");
const hashtagsRoute = require("./routes/hashtag");
const notifications = require("./routes/notifications");
const clearNotifications = require("./routes/clearNotifications");
const search = require("./routes/search");

dotenv.config();

const fileUpload = require("express-fileupload");

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
};

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: corsOptions
});



app.use(cors(corsOptions));
app.use(fileUpload());
app.set("io", io);

mongoose.connect(process.env.DB_PATH,
    { useNewUrlParser: true }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", hashtagsRoute);
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api", uploadProfilePicture);
app.use("/api", createPost);
app.use("/api", deletePost);
app.use("/api", feed);
app.use("/api", profileFeed);
app.use("/api", globalFeed);
app.use("/api", user);
app.use("/api", followUser);
app.use("/api", unfollowUser);
app.use("/api", likePost);
app.use("/api", unlikePost);
app.use("/api", postReply);
app.use("/api", getReplies);
app.use("/api", notifications);
app.use("/api", clearNotifications);
app.use("/api", search);

io.on('connection', (socket) => {
    socket.on('joinRoom', (userId) => {
        socket.join(userId);
    });
});

server.listen(5001, () => console.log("Server started on port 5001")); 