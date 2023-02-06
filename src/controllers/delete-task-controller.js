const { Task } = require("../models/task-model");

const deleteTaskController = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({
                code: 400,
                message: "Task not found",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Task deleted successfully",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error deleting task",
            error: error,
        });
    }
};

module.exports = deleteTaskController;
