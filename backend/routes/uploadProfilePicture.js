const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const storage = require("../firebase");
const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");



router.post("/uploadProfilePicture", verifyToken, async (req, res) => {
    const userId = req.user._id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let image = req.files.image;

    const filename = `${Date.now()}_${image.name}`;

    const imageRef = ref(storage, 'profileImages/' + filename);

    try {
        await uploadBytes(imageRef, image.data);

        const publicUrl = await getDownloadURL(imageRef);

        await User.findByIdAndUpdate(userId, { pictureURL: publicUrl });

        res.status(200).send({ message: "Profile picture updated successfully!", imageUrl: publicUrl });

    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
