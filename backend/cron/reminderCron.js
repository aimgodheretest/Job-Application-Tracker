const cron = require("node-cron");

const { Reminder, User, Application } = require("../config/associations");

const { sendEmail } = require("../services/emailService");
const reminderTemplate = require("../templates/reminderTemplate");

const startReminderCron = () => {
  cron.schedule(process.env.REMINDER_CRON, async () => {
    try {
      console.log("Checking reminders...");

      const today = new Date().toISOString().split("T")[0];

      const currentTime = new Date().toTimeString().slice(0, 5);

      const reminders = await Reminder.findAll({
        where: {
          status: "Pending",
          notificationSent: false,
          reminderDate: today,
        },
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: Application,
            as: "application",
          },
        ],
      });

      console.log(`Found ${reminders.length} reminder(s).`);

      for (const reminder of reminders) {
        try {
          const reminderTime = reminder.reminderTime.slice(0, 5);

          if (reminderTime > currentTime) {
            continue;
          }

          const email = reminderTemplate({
            userName: reminder.user.name,
            companyName: reminder.application.company,
            position: reminder.application.position,
            reminderTitle: reminder.title,
            reminderDescription: reminder.description,
            reminderDate: reminder.reminderDate,
            reminderTime: reminder.reminderTime,
          });

          await sendEmail({
            to: reminder.user.email,
            toName: reminder.user.name,
            subject: email.subject,
            htmlContent: email.htmlContent,
            textContent: `Reminder: ${reminder.title}`,
          });

          await reminder.update({
            notificationSent: true,
            notificationSentAt: new Date(),
          });

          console.log(`Reminder email sent to ${reminder.user.email}`);
        } catch (error) {
          console.error(
            `Failed to send reminder #${reminder.id}:`,
            error.message,
          );
        }
      }
    } catch (error) {
      console.error("Reminder Cron Error:", error);
    }
  });

  console.log("Reminder cron started.");
};

module.exports = startReminderCron;
