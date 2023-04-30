const express = require("express");
const router = express.Router();
const applicant = require("../controllers/applicantController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");


// router.post("/register", register.registerAuth);

router.get("/profile", auth , applicant.getProfile)
router.get("/profile/generate-cv", auth , applicant.generateCV)
router.get("/dashboard", auth , applicant.applicantDashboard)
router.get("/jobs/search", auth , applicant.searchJobsMult)
router.post("/apply/:id", auth , applicant.apply)      // get?? post??
router.put("/profile", auth , applicant.updateProfile)

module.exports = router;
