const brevo = require("../config/brevo");

const sendEmail = async ({
  to,
  toName,
  subject,
  htmlContent,
  textContent = "",
}) => {
  try {
    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },

      to: [
        {
          email: to,
          name: toName,
        },
      ],

      subject,

      htmlContent,

      textContent:
        textContent || "This is a reminder from Job Application Tracker.",
    });
    return response;
  } catch (error) {
    console.error("Email sending failed:", error);

    throw error;
  }
};

module.exports = {
  sendEmail,
};
