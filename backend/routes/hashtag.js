const Post = require("../models/Post");
const User = require("../models/User");

const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.get("/hashtag/:hashtagID", verifyToken, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const { hashtagID } = req.params;
    console.log("inside API")

    try {
        const posts = await Post.find({ hashtags: hashtagID }) 
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