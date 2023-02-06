const { Task } = require("../models/task-model");

const updateTaskController = async (req, res) => {
    try {
        const { Status } = req.body;
        if (Status && !["New", "Incomplete", "Complete"].includes(Status)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid Status value",
            });
        }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!task) {
            return res.status(404).json({
                code: 404,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Error updating task",
            error: error,
        });
    }
};

module.exports = updateTaskController;
