const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken")

const Post = require("../models/Post");

router.get("/globalFeed", verifyToken, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const posts = await Post.find()
        .populate({
            path: 'user',
            select: 'name pictureURL'
        })
        .sort({ date: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
