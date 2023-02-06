const { User } = require("../models/user-model");

const getUserController = async (req, res) => {
    try {
        const userId = req.payload.userId;
        const user = await User.findById(userId);
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

module.exports = getUserController;
