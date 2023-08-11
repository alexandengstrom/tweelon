const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

const Post = require("../models/Post");

router.post("/unlikePost/:postId", verifyToken, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send("Post not found.");
        }

        if (!post.likes.includes(userId)) {
            return res.status(400).send("You haven't liked this post yet.");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } }, 
            { new: true }
        );

        res.status(200).send(`Post unliked by user ${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
