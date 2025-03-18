const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    if (!authHeader ) {
        return res.status(401).json({
            message: "Unauthorized user request. Please provide a valid token.",
        });
    }

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET); 
        req.user = decoded;
        next(); 
    } catch (err) {
        res.status(401).json({
            message: "Unauthorized user request. Please login again.",
        });
        console.log(err.message);
    }
};