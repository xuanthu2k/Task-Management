const jwt = require("jsonwebtoken");
const { generateAccessToken, setRefreshToken } = require("../helpers/jwt");

const { User } = require("../models/user-model");

const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(200).json({
                code: 400,
                message: "Refresh token is empty!",
            });
        }
        const user = await User.find({
            RefreshToken: refreshToken,
        });
        if (user.length === 0) {
            return res.status(200).json({
                code: 400,
                message: "Can't find user with corresponding jwt",
            });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const token = await generateAccessToken(user[0]._id);
        return res.status(200).json({
            code: 200,
            message: "Refresh token successful",
            data: token,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Error refresh token",
            error,
        });
    }
};

module.exports = refreshTokenController;
