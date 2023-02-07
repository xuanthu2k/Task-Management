const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        DueDate: {
            type: Date,
            required: true,
        },
        Status: {
            type: String,
            default: "New",
            enum: ["New", "Incomplete", "Complete"],
        },
        sendReminder: {
            type: Boolean,
            default: false,
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        SubTasks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
        ParentTask: {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = {
    Task,
};
