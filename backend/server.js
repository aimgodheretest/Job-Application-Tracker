require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
require("./config/associations");
const startReminderCron = require("./cron/reminderCron");

const PORT = process.env.PORT || 4000;
sequelize
  // .sync({ alter: true })
  .authenticate()
  .then(() => {
    console.log(`DB Connected...`);
    // Start the server ONLY after the DB connection is successful
    startReminderCron();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
