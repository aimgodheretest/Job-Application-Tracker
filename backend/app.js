const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyRoutes = require("./routes/companyRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const emailRoutes = require("./routes/emailRoutes");
const documentRoutes = require("./routes/documentRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const profileRoutes = require("./routes/profileRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const auth = require("./middleware/auth");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://job-application-tracker-54r2.onrender.com",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/settings", settingsRoutes);

module.exports = app;
