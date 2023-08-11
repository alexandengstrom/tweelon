// Required dependencies
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const verifyToken = (req, res, next) => {
    // Extract the 'Authorization' header from the request
    const authHeader = req.header("Authorization");
    
    // If there's no 'Authorization' header, deny access
    if (!authHeader) return res.status(401).send("Access denied");

    // Extract the JWT token from the 'Authorization' header (removing "Bearer" prefix)
    const token = authHeader.replace("Bearer ", "");

    // If the token isn't present, deny access
    if (!token) return res.status(401).send("Access denied");

    try {
        // Verify the JWT token using the secret key
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        
        // Attach the verified user's payload to the request object for subsequent middleware
        req.user = verified;
        
        // Proceed to the next middleware function
        next();
    } catch(err) {
        // If the error is specifically a JWT error, send an "Invalid token" response
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).send("Invalid token");
        }
        // For all other errors, send a "Bad request" response
        return res.status(400).send("Bad request");
    }
}

// Export the middleware for use in other parts of the application
module.exports = verifyToken;
