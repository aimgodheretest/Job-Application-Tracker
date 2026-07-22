const reminderTemplate = ({
  userName,
  companyName,
  position,
  reminderTitle,
  reminderDescription,
  reminderDate,
  reminderTime,
}) => {
  return {
    subject: `Reminder: ${reminderTitle}`,

    htmlContent: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>Hi ${userName},</h2>

        <p>This is a reminder for your job application.</p>

        <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse;">
          <tr>
            <td><strong>Company</strong></td>
            <td>${companyName}</td>
          </tr>

          <tr>
            <td><strong>Position</strong></td>
            <td>${position}</td>
          </tr>

          <tr>
            <td><strong>Reminder</strong></td>
            <td>${reminderTitle}</td>
          </tr>

          <tr>
            <td><strong>Description</strong></td>
            <td>${reminderDescription || "N/A"}</td>
          </tr>

          <tr>
            <td><strong>Date</strong></td>
            <td>${reminderDate}</td>
          </tr>

          <tr>
            <td><strong>Time</strong></td>
            <td>${reminderTime}</td>
          </tr>
        </table>

        <br>

        <p>Good luck with your application! 🚀</p>

        <p><strong>Job Application Tracker</strong></p>
      </div>
    `,
  };
};

module.exports = reminderTemplate;
