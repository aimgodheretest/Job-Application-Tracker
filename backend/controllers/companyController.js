const Company = require("../models/company");
const createCompany = async (req, res) => {
  try {
    const {
      name,
      website,
      industry,
      companySize,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      notes,
    } = req.body;

    const company = await Company.create({
      name,
      website,
      industry,
      companySize,
      location,
      contactPerson,
      contactEmail,
      contactPhone,
      notes,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("Create Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Get Companies Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Get Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await company.update(req.body);

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    console.error("Update Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    await company.destroy();

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Delete Company Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
