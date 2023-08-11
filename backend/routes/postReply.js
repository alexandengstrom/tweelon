const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

const Post = require("../models/Post");
const Reply = require("../models/Reply");

router.post("/postReply/:postId", verifyToken, async (req, res) => {
    const io = req.app.get('io');

    const postId = req.params.postId;
    const userId = req.user._id;

    const content = req.body.content;

    if (!content || content.length > 140) {
        return res.status(400).send("Invalid reply content.");
    }

    try {
        const post = await Post.findById(postId);


        if (!post) {
            return res.status(404).send("Post not found.");
        }

        const reply = new Reply({
            post: postId,
            user: userId,
            content: content
        });

        await reply.save();

        await Post.findByIdAndUpdate(postId, { $addToSet: { replies: reply._id } });

        io.to(post.user.toString()).emit("NEW_NOTIFICATION");

        res.status(200).send(`Reply added to post ${postId} by user ${userId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
