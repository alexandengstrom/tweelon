const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Reply = require("../models/Reply");
const verifyToken = require("../middlewares/verifyToken");

router.delete("/deletePost/:postId", verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const userIdFromToken = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        if (post.user.toString() !== userIdFromToken) {
            return res.status(403).send("You're not authorized to delete this post");
        }

        await User.findByIdAndUpdate(userIdFromToken, {
            $pull: { posts: postId }
        });

        await Reply.deleteMany({ post: postId });

        await Post.findByIdAndRemove(postId);

        console.log("Deleted post");
        res.status(200).send({ message: "Post deleted successfully" });

    } catch(err) {
        console.error("Error deleting post:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
