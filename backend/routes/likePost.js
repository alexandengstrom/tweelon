const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

router.post("/likePost/:postId", verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send("Post not found.");
        }

        if (post.likes.includes(userId)) {
            return res.status(400).send("Post already liked.");
        }

        await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });

        if (post.user.toString() !== userId.toString()) {
            const newNotification = new Notification({
                user: post.user,
                post: postId,
                type: "like",
                triggeredBy: userId,
                isRead: false
            });

            await newNotification.save();

            await User.findByIdAndUpdate(post.user, {
                $addToSet: { notifications: newNotification._id }
            });

            const io = req.app.get('io');
            io.to(post.user.toString()).emit("NEW_NOTIFICATION");
        }

        res.status(200).send(`Liked post ${postId} by user ${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

