const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader) return res.status(401).send("Access denied");

    const token = authHeader.replace("Bearer ", "");

    if (!token) return res.status(401).send("Access denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verified;
        next();
    } catch(err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).send("Invalid token");
        }
        return res.status(400).send("Bad request");
    }
}

module.exports = verifyToken;
