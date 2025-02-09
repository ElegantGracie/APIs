const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) return res.status(401).send('Access Denied. No token provided.');
    
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if(err.name === "TokenExpiredError") {
                    return res.status(400).json({success: false, message: 'Token Expired. Please login again.'});
                }
                return res.status(400).json({success: false, message: 'Invalid token.'});
            }
            req.user = {
                id: decoded.id,
            }
            next();
        })
    } catch (ex) {
        console.log("Error verifying token: ", ex);
        return res.status(500).json({success: false, message: 'Error verifying token. Please try again.'});
    }
};

module.exports = verifyToken;