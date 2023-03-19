const loginOps = require("../db/loginOps");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.loginAuth = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!validator.isEmail(email) || !password || !role) {
      res.status(400).json({ message: "Enter all required fields." });
    } else {
      const pass = await loginOps.loginOps(email, role);
      if (pass === 0) {
        res.status(401).send("Incorrect Email or Role");
      } else {
        if (await bcrypt.compare(password, pass.password)) {
          const jwToken = generateToken(role, pass.id);
          res.json({
            token: jwToken,
            Details: Object.fromEntries(
              Object.entries(pass).filter(([key]) => !key.includes("password"))
            ),
          });
        } else {
          res.status(401).send("Incorrect password.");
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
const generateToken = (role, id) => {
  return jwt.sign({ role, id }, process.env.JWT_SECRET, {
    expiresIn: "5300s",
  });
};
