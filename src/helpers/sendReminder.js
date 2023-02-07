const nodemailer = require("nodemailer");

const sendReminder = async (user, task) => {
    // Create a transporter using a gmail account
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "xuanthuphan2k@gmail.com",
            pass: "Xuanthu1998@",
        },
    });

    // Setup email data
    let mailOptions = {
        from: "xuanthuphan2k@gmail.com",
        to: user.email,
        subject: `Reminder: ${task.title}`,
        text: `Hi ${user.Name}, this is a reminder for the task "${task.Title}" with due day of ${task.DueDay}. Please complete the task on time.`,
    };

    // Send email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(
                `Reminder email sent to ${user.Email} for task ${task.Title}`
            );
        }
    });
};

module.exports = sendReminder;
