const { Task } = require("../models/task-model");

const createTaskController = async (req, res) => {
    try {
        const User = req.payload.userId;
        const { Title, Description, DueDate, Status, SubTasks, ParentTask } =
            req.body;
        const task = new Task({
            Title,
            Description,
            DueDate,
            Status,
            SubTasks,
            ParentTask,
            User,
        });
        await task.save();
        return res.status(200).json({
            code: 200,
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Error creating task",
            error,
        });
    }
};

module.exports = createTaskController;
