const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");

router.post("/admin", register.registerAuth);
router.post("/applicant", register.registerAuth);
router.post("/employer", register.registerAuth);

module.exports = router;