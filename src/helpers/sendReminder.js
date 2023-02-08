const nodemailer = require("nodemailer");

const sendReminder = async (user, task) => {
    // Create a transporter using a gmail account
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "xuanthuphan2k@gmail.com",
            pass: "whsyrgwcxououubp",
        },
    });

    // Setup email data
    let mailOptions = {
        from: "xuanthuphan2k@gmail.com",
        to: user.Email,
        subject: `Reminder: ${task.Title}`,
        text: `Hi ${user.Name}, this is a reminder for the task "${task.Title}" with due day of ${task.DueDay}. Please complete the task on time.`,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        console.log(
            `Reminder email sent to ${user.Email} for task ${task.Title}`
        );
        return 1;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

module.exports = sendReminder;
