const settingsService = require("../services/settingsService");

exports.changePassword = async (req, res) => {
  try {
    const result = await settingsService.changePassword(req.user.id, req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Change Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const result = await settingsService.deleteAccount(
      req.user.id,
      req.body.password,
    );

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Delete Account Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
