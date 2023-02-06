const logoutController = (req, res) => {
    return res.status(200).json({
        code: 200,
        message: "logout success",
    });
};

module.exports = logoutController;
