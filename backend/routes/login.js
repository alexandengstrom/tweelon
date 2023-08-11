const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../validation")
const jwt = require ("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(401).send("Incorrect email");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).send("Incorrect password!");
    }

    const token = jwt.sign({
        _id: user._id
    }, process.env.TOKEN_SECRET_KEY,
    { expiresIn: '6h' } 
    );
    res.header("auth-token", token);

    res.send(token)

})

module.exports = router;