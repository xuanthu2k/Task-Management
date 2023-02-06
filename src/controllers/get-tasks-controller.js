const { Task } = require("../models/task-model");

const getTasksController = async (req, res) => {
    try {
        const userId = req.payload.userId;
        const tasks = await Task.find({
            ParentTask: { $exists: false },
            User: userId,
        });
        return res.status(200).json({
            code: 200,
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "server has errors",
        });
    }
};

module.exports = getTasksController;
