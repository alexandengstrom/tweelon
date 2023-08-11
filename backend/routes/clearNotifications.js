const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

const Notification = require("../models/Notification");

router.put("/clearNotifications", verifyToken, async (req, res) => {
    const userId = req.user._id;

    try {
        await Notification.updateMany(
            { user: userId, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).send("Notifications cleared.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;