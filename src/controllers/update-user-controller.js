const { User } = require("../models/user-model");
const bcrypt = require("bcrypt");
const validPassword = require("../helpers/valid-password");

const updateUserController = async (req, res) => {
    try {
        const userId = req.payload.userId;
        const { Name, Password, Phone, ProfileImage } = req.body;
        console.log(Name, Password, Phone, ProfileImage);
        const updateData = {};
        if (Password) {
            if (!validPassword(Password)) {
                return res.status(400).json({
                    code: 400,
                    message: "invalid email/password/name",
                });
            }
            const hash = bcrypt.hashSync(Password, 10);
            updateData.Password = hash;
        }
        if (Name) {
            updateData.Name = Name;
        }
        if (Phone) {
            updateData.Phone = Phone;
        }
        if (ProfileImage) {
            updateData.ProfileImage = ProfileImage;
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            {
                new: true,
            }
        );
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "User not found",
            });
        }
        return res.status(200).json({
            code: 200,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "server has errors",
        });
    }
};

module.exports = updateUserController;
