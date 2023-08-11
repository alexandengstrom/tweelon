const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken")

const Post = require("../models/Post");
const User = require("../models/User");

router.get("/search/:query", verifyToken, async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const query = req.params.query;
    const regexQuery = new RegExp(query, 'i');

    try {
        const matchingUsers = await User.find({ name: { $regex: regexQuery } });
        const userIds = matchingUsers.map(user => user._id);

        const posts = await Post.find({
            $or: [
                { content: { $regex: regexQuery } },
                { user: { $in: userIds } }
            ]
        })
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
