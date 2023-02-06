const { User } = require("../models/user-model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const validPassword = require("../helpers/valid-password");

const registerController = async (req, res) => {
    try {
        const { email, password, name, phone, profileImage } = req.body;
        // check valid data
        if (
            !email ||
            !validPassword(password) ||
            !name ||
            !validator.isEmail(email)
        ) {
            return res.status(400).json({
                code: 400,
                message: "invalid email/password/name",
            });
        }
        // check email exists
        const checkExists = await User.find({ Email: email }).exec();
        if (checkExists.length > 0) {
            return res.status(400).json({
                code: 400,
                message: "Email already exists",
            });
        }
        // hash pwd
        const hash = bcrypt.hashSync(password, 10);
        // save to db
        const saveUser = new User({
            Name: name,
            Email: email,
            Password: hash,
            Phone: phone,
            ProfileImage: profileImage,
        });
        await saveUser.save();
        return res.status(200).json({
            code: 200,
            message: "register success",
            data: saveUser,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "server has errors",
            error,
        });
    }
};

module.exports = registerController;
