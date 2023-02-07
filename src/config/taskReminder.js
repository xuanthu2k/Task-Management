const schedule = require("node-cron");
const sendReminder = require("../helpers/sendReminder");
const { Task } = require("../models/task-model");
const { User } = require("../models/user-model");

schedule.schedule("* * * * * *", function () {
    const today = new Date();
    Task.find(
        { sendReminder: false, Status: { $ne: "Complete" } },
        function (err, tasks) {
            if (err) {
                console.error(err);
            } else {
                tasks.forEach(function (task) {
                    const dueDay = new Date(task.DueDate);
                    if (
                        dueDay.getDate() === today.getDate() &&
                        dueDay.getMonth() === today.getMonth() &&
                        dueDay.getFullYear() === today.getFullYear()
                    ) {
                        User.findById(task.User, function (err, user) {
                            if (err) {
                                console.error(err);
                            } else {
                                sendReminder(user, task);
                            }
                        });
                    }
                });
            }
        }
    );
});
