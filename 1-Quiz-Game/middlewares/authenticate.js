const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized, Bearer token missing or invalid" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = { id: decoded.id };

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
    }
};

module.exports = { authMiddleware };