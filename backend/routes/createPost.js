const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");
const storage = require("../firebase");



router.post("/createPost", verifyToken, async (req, res) => {
    const content = req.body.content;

    let pictureURL = '';

    if (req.files && Object.keys(req.files).length !== 0) {
        let image = req.files.image;
        const filename = `${Date.now()}_${image.name}`;
        const imageRef = ref(storage, 'postImages/' + filename);

        try {
            await uploadBytes(imageRef, image.data);
            pictureURL = await getDownloadURL(imageRef);
        } catch (error) {
            console.error("Error uploading post picture:", error);
            return res.status(500).send("Error uploading post picture");
        }
    }

    const post = new Post({
        user: req.user._id,
        content: content,
        pictureURL: pictureURL
    });

    try {
        const savedPost = await post.save();
        await User.findByIdAndUpdate(req.user._id, {
            $push: { posts: savedPost._id }
        });
        console.log("Saved post")
        res.status(201).send(savedPost);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;
