const {
    generateAccessToken,
    generateRefreshToken,
    setRefreshToken,
} = require("../helpers/jwt");
const { User } = require("../models/user-model");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check valid data
        if (!email || !password) {
            return res.status(400).json({
                code: 400,
                message: "invalid email/password",
            });
        }
        // check in db
        const foundUser = await User.findOne({ Email: email }).exec();
        if (!foundUser) {
            return res.status(400).json({
                code: 400,
                message: "Email not exists!",
            });
        }
        const match = await bcrypt.compare(password, foundUser.Password);
        if (!match) {
            return res.status(400).json({
                code: 400,
                message: "Wrong pwd",
            });
        }
        // generate token
        const accessToken = await generateAccessToken(foundUser._id);
        const refreshToken = await generateRefreshToken(foundUser._id);
        await setRefreshToken(foundUser._id, refreshToken);
        return res.status(200).json({
            code: 200,
            message: "login success",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "server has errors",
        });
    }
};

module.exports = loginController;
