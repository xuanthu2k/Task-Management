const jwt = require("jsonwebtoken");
const { User } = require("../models/user-model");

const generateAccessToken = async (userId) => {
    try {
        const payload = {
            userId,
        };
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h",
        };
        const token = await jwt.sign(payload, secretKey, options);
        return token;
    } catch (error) {
        return error;
    }
};

const generateRefreshToken = async (userId) => {
    try {
        const payload = {
            userId,
        };
        const secretKey = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1d",
        };
        const token = await jwt.sign(payload, secretKey, options);
        return token;
    } catch (error) {
        return error;
    }
};

const setRefreshToken = async (userId, refreshToken) => {
    try {
        await User.findByIdAndUpdate(
            userId,
            { $set: { RefreshToken: refreshToken } },
            {
                new: true,
            }
        );
    } catch (error) {
        return error;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    setRefreshToken,
};
