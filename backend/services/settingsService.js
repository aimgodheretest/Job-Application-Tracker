const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const User = require("../models/user");
const ApplicationDocument = require("../models/applicationDocument");

exports.changePassword = async (userId, body) => {
  const { currentPassword, newPassword, confirmPassword } = body;

  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required.",
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      statusCode: 400,
      message: "Password must be at least 8 characters long.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password and confirm password do not match.",
    };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "New password must be different from current password.",
    };
  }

  // Find User
  const user = await User.findByPk(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  // Verify Password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      statusCode: 401,
      message: "Current password is incorrect.",
    };
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update Password
  await user.update({
    password: hashedPassword,
  });

  return {
    success: true,
    statusCode: 200,
    message: "Password changed successfully.",
  };
};

exports.deleteAccount = async (userId, password) => {
  if (!password) {
    return {
      success: false,
      statusCode: 400,
      message: "Password is required.",
    };
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found.",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid password.",
    };
  }

  // Delete uploaded files
  const documents = await ApplicationDocument.findAll();

  for (const document of documents) {
    if (!document.filePath) continue;

    const filePath = path.join(process.cwd(), document.filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Delete user
  await user.destroy();

  return {
    success: true,
    statusCode: 200,
    message: "Account deleted successfully.",
  };
};
