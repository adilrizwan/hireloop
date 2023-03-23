const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const app = require("../controllers/applicantController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");


router.post("/register", register.registerAuth);

router.get("/search", auth, admin.search);
router.get("/search/jobs", auth, app.searchJobsMult);
router.delete("/delete", auth, admin.deleteUser);
router.get("/search/applicationlog", auth, admin.getApplicationLog);
router.get("/search/dashboard", auth, admin.applicantDashboard);
router.delete("/delete/jobs", auth, admin.deleteJob);

module.exports = router;