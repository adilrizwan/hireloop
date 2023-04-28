const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const app = require("../controllers/applicantController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");


// router.post("/register", register.registerAuth);

router.get("/search", auth, admin.search);
router.get("/jobs/search", auth, app.searchJobsMult);
router.delete("/employer/:id", auth, admin.deleteEmployer);
router.delete("/applicant/:id", auth, admin.deleteApplicant);
router.get("/applications", auth, admin.getApplicationLog);
router.get("/applicant/dashboard", auth, admin.applicantDashboard);
router.delete("/jobs/:id", auth, admin.deleteJob);

module.exports = router;