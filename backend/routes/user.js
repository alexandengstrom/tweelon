const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken")

const Post = require("../models/Post");
const User = require("../models/User");


router.get("/user/:userId", verifyToken, async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId)
        .populate('followers')
        .populate('following')
        .exec();

        if (!user) {
            return res.status(404).send("User not found");
        }
        
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
