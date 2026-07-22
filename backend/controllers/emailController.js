const { sendEmail } = require("../services/emailService");

const sendTestEmail = async (req, res) => {
  try {
    const { email } = req.body;

    await sendEmail({
      to: email,
      toName: "Murli",
      subject: "Brevo Integration Successful 🎉",

      htmlContent: `
        <h2>Hello Murli 👋</h2>

        <p>Your Brevo integration is working successfully.</p>

        <p>This is the first email sent from your Job Application Tracker.</p>

        <br>

        <b>Next Step:</b> Reminder Notifications 🚀
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};

module.exports = {
  sendTestEmail,
};
