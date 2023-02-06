const { Task } = require("../models/task-model");

const getTaskController = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                code: 404,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Task retrieved successfully",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Error retrieving task",
            error: error,
        });
    }
};

module.exports = getTaskController;
