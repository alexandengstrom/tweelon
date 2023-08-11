const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");

const Notification = require("../models/Notification");

router.get("/notifications", verifyToken, async (req, res) => {
    const userId = req.user._id;

    try {
        const notifications = await Notification.find({ user: userId })
            .populate('post', 'content')
            .populate('triggeredBy', 'name pictureURL')
            .sort({ date: -1 })
            .exec();

        res.status(200).json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
