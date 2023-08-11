const router = require("express").Router();
const User = require("../models/User");
const Notification = require("../models/Notification"); 
const verifyToken = require("../middlewares/verifyToken");

router.post("/followUser/:followID", verifyToken, async (req, res) => {
    const followID = req.params.followID;

    if (followID === req.user._id) {
        return res.status(400).send("You cannot follow yourself.");
    }

    try {
        const userBeingFollowed = await User.findByIdAndUpdate(
            followID, 
            { $addToSet: { followers: req.user._id } },
            { new: true }
        );

        if (!userBeingFollowed) {
            return res.status(404).send("User not found.");
        }

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { following: followID }
        });

        const newNotification = new Notification({
            user: followID,
            type: "follow",
            triggeredBy: req.user._id,
            isRead: false
        });

        await newNotification.save();

        await User.findByIdAndUpdate(followID, {
            $addToSet: { notifications: newNotification._id }
        });


        const io = req.app.get('io');
        io.to(followID).emit("NEW_NOTIFICATION");

        res.status(200).send(`You are now following ${userBeingFollowed.name}`);
    } catch(err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
