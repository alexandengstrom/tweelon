const router = require("express").Router();
const Post = require("../models/Post");
const Reply = require("../models/Reply");

router.get("/getReplies/:postId", async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).send("Post not found.");
        }

        const replies = await Reply.find({ post: postId }).populate('user');

        res.status(200).json(replies);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
