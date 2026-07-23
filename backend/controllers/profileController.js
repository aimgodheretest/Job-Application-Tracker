const fs = require("fs");
const path = require("path");
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

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a profile image.",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete old profile image if it exists
    if (user.profileImage) {
      const oldImagePath = path.join(process.cwd(), user.profileImage);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await user.update({
      profileImage: req.file.path,
    });

    return res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully.",
      profileImage: user.profileImage,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProfileImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.profileImage) {
      return res.status(400).json({
        success: false,
        message: "No profile image found.",
      });
    }

    if (fs.existsSync(user.profileImage)) {
      fs.unlinkSync(user.profileImage);
    }

    await user.update({
      profileImage: null,
    });

    return res.status(200).json({
      success: true,
      message: "Profile image deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete old resume if it exists
    if (user.resume && fs.existsSync(user.resume)) {
      fs.unlinkSync(user.resume);
    }

    await user.update({
      resume: req.file.path,
    });

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: user.resume,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message: "No resume found.",
      });
    }

    if (fs.existsSync(user.resume)) {
      fs.unlinkSync(user.resume);
    }

    await user.update({
      resume: null,
    });

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
  uploadResume,
  deleteResume,
};
