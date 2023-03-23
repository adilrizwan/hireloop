const express = require("express");
const router = express.Router();
const applicant = require("../controllers/applicantController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");


router.post("/register", register.registerAuth);

router.get("/profile", auth , applicant.getProfile)
router.put("/profile/update", auth , applicant.updateProfile)
router.post("/apply/:id", auth , applicant.apply)      // get?? post??
router.get("/dashboard", auth , applicant.dashboard)
router.get("/search", auth , applicant.searchJobsMult)
router.get("/profile/generate-cv", auth , applicant.generateCV)

module.exports = router;
