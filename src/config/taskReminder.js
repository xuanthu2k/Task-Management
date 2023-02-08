const schedule = require("node-cron");
const sendReminder = require("../helpers/sendReminder");
const { Task } = require("../models/task-model");
const { User } = require("../models/user-model");

schedule.schedule("0 0 * * *", async function () {
    try {
        // Find tasks with sendReminder=false and status!='Complete'
        const tasks = await Task.find({
            $and: [{ SendReminder: false }, { Status: { $ne: "Complete" } }],
        });

        // Iterate over the tasks and send reminders to the relevant users
        for (const task of tasks) {
            const user = await User.findById(task.User);

            // Check if the task's due date is today
            const dueDate = new Date(task.DueDate);
            const today = new Date();
            if (
                dueDate.getDate() === today.getDate() &&
                dueDate.getMonth() === today.getMonth() &&
                dueDate.getFullYear() === today.getFullYear()
            ) {
                // Send the reminder to the user
                const result = await sendReminder(user, task);
                if (result === 1) {
                    // Update the task's sendReminder field to true
                    task.SendReminder = true;
                    await task.save();
                } else {
                    process.exit(1);
                }
            }
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});
