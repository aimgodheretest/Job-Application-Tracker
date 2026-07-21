const express = require("express");

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const auth = require("../middleware/auth");
const router = express.Router();

router.route("/").post(auth, createCompany).get(auth, getAllCompanies);

router
  .route("/:id")
  .get(auth, getCompanyById)
  .put(auth, updateCompany)
  .delete(auth, deleteCompany);

module.exports = router;
