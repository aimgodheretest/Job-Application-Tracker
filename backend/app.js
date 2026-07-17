const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.use("/api/profile", auth, (req, res, next) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

module.exports = app;
