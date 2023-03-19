const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const app = require("../controllers/applicantController");
const auth = require("../middleware/auth");

router.get("/search/applicants/all", auth, admin.getApplicants);
router.get("/search/employers/all", auth, admin.getEmployers);
router.get("/search/applicants/:id", auth, admin.getApplicantbyID);
router.get("/search/employers/:id", auth, admin.getEmployerbyID);
router.get("/search/applicants", auth, admin.getApplicantbyEmail);
router.get("/search/employers", auth, admin.getEmployerbyEmail);
router.get("/search/jobs/all", auth, admin.getAllJobs);
router.get("/search/jobs", auth, app.searchJobsMult);
router.get("/search/applicationlog", auth, admin.getApplicationLog);
router.get("/search/dashboard/:id", auth, admin.applicantDashboard);

router.delete("/delete/applicants/:id", auth, admin.deleteApplicant);
router.delete("/delete/employers/:id", auth, admin.deleteEmployer);
router.delete("/delete/jobs/:id", auth, admin.deleteJob);

module.exports = router;