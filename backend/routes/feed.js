const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken")

const Post = require("../models/Post");
const User = require("../models/User");

router.get("/feed", verifyToken, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const user = await User.findById(req.user._id);

        const userIds = [req.user._id, ...user.following];

        const posts = await Post.find({ user: { $in: userIds } })
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