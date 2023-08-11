const router = require("express").Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken")

router.post("/unfollowUser/:followID", verifyToken, async (req, res) => {
    const followID = req.params.followID;

    if (followID === req.user._id) {
        return res.status(400).send("You cannot unfollow yourself.");
    }

    try {
        const userBeingUnfollowed = await User.findByIdAndUpdate(
            followID, 
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        if (!userBeingUnfollowed) {
            return res.status(404).send("User not found.");
        }

        await User.findByIdAndUpdate(req.user._id, {
            $pull: { following: followID }
        });

        console.log(`User ${req.user._id} stopped following ${followID}`);
        res.status(200).send(`You have unfollowed ${userBeingUnfollowed.name}`);
    } catch(err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
