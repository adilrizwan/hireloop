const express = require("express");
const router = express.Router();
const employer = require("../controllers/employerController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");


// router.post("/register", register.registerAuth);

router.get("/profile", auth, employer.getProfile);
router.put("/profile", auth, employer.updateProfile);
router.post("/jobs/create", auth, employer.createOpening);
router.get("/jobs", auth, employer.getPostings);
router.get("/jobs/:id", auth, employer.getJobAndApplicantDetails);
router.put("/jobs/:id", auth, employer.patchPosting);
router.post("/jobs/shortlist/:id", auth, employer.updateApplicationStatus);
router.delete("/jobs/:id", auth, employer.deletePosting);

module.exports = router;
