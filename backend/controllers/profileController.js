const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      headline,
      careerGoal,
      experience,
      location,
      bio,
      linkedin,
      github,
      portfolio,
    } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.update({
      name,
      phone,
      headline,
      careerGoal,
      experience,
      location,
      bio,
      linkedin,
      github,
      portfolio,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
