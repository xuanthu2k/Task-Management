const jwt = require("jsonwebtoken");
const verifyAccessToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
        return res.status(400).json({
            code: 400,
            message: "token is empty",
        });
    }
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            return res.status(400).json({
                code: 400,
                message: "invalid token",
            });
        }
        req.payload = payload;
        next();
    });
};

module.exports = verifyAccessToken;
