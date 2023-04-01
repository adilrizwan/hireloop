const registerOps = require("../db/registerOps");
const adminStruct = require("../Structures/adminStruct");
const applicantStruct = require("../Structures/applicantStruct");
const employerStruct = require("../Structures/employerStruct");
const bcrypt = require("bcrypt");
const validator = require("validator");

exports.registerAuth = async (req, res) => {
  try {
    const details = req.body;
    if ((await registerOps.userExists(details.email)) === 1) {
      res.status(403).json({ message: "User already exists. Try logging in." });
    } else {
      if (details.role.toUpperCase() === "ADMIN") {
        if (
          !details.role ||
          !details.firstName ||
          !details.lastName ||
          !details.email.endsWith("@hireloop.com") ||
          !details.password
        ) {
          res.status(400).json({ message: "Enter all required fields." });
        } else {
          const admin = new adminStruct(
            details.role.toUpperCase(),
            details.firstName.toUpperCase().replace(/'/gi, "''"),
            details.lastName.toUpperCase().replace(/'/gi, "''"),
            details.email.toUpperCase()
          );
          const succ = await registerOps.adminRegister(
            admin,
            await bcrypt.hash(details.password, 5)
          );
          res.status(201).json({ Status: `${succ}` }); //, token: generateToken(details.email, details.role) });
        }
      } else if (details.role.toUpperCase() === "APPLICANT") {
        if (
          !details.firstName ||
          !details.lastName ||
          !details.gender ||
          !details.DOB ||
          // !details.highestEducation ||
          // !details.major ||
          // !details.institution ||
          !validator.isEmail(details.email) ||
          // !details.phoneNo ||
          // !details.city ||
          !details.country ||
          !details.password
        ) {
          res.status(400).json({ message: "Enter all required fields." });
        } else {
          if (!details.highestEducation) {
            details.highestEducation = "NULL";
          }
          if (!details.major) {
            details.major = "NULL";
          }
          if (!details.institution) {
            details.institution = "NULL";
          }
          if (!details.phoneNo) {
            details.phoneNo = "NULL";
          }
          if (!details.city) {
            details.city = "NULL";
          }
          if (!details.bio) {
            details.bio = "NULL";
          }
          const applicant = new applicantStruct(
            details.role.toUpperCase(),
            details.firstName.toUpperCase().replace(/'/gi, "''"),
            details.lastName.toUpperCase().replace(/'/gi, "''"),
            details.gender.toUpperCase(),
            details.DOB,
            details.highestEducation.toUpperCase().replace(/'/gi, "''"),
            details.major.toUpperCase().replace(/'/gi, "''"),
            details.institution.toUpperCase().replace(/'/gi, "''"),
            details.email.toUpperCase(),
            details.phoneNo,
            details.city.toUpperCase().replace(/'/gi, "''"),
            details.country.toUpperCase().replace(/'/gi, "''"),
            details.bio.toUpperCase().replace(/'/gi, "''")
          );
          const succ = await registerOps.applicantRegister(
            applicant,
            await bcrypt.hash(details.password, 5)
          );
          res.status(201).json({ Status: `${succ}` }); //, token: generateToken(details.email, details.role) });
        }
      } else if (details.role.toUpperCase() === "EMPLOYER") {
        if (
          !details.companyName ||
          !details.estdYear ||
          !details.noOfEmployees ||
          !details.type ||
          !details.prodDomain ||
          // !details.web ||
          !validator.isEmail(details.email) ||
          // !details.phoneNo ||
          !details.city ||
          !details.country ||
          !details.password
        ) {
          res.status(400).json({ message: "Enter all required fields." });
        } else {
          if (!details.web) {
            details.web = "NULL";
          }
          if (!details.phoneNo) {
            details.phoneNo = "NULL";
          }
          if (!details.about) {
            details.about = "NULL";
          }
          const employer = new employerStruct(
            details.role.toUpperCase(),
            details.companyName.toUpperCase().replace(/'/gi, "''"),
            details.estdYear,
            details.noOfEmployees,
            details.type.toUpperCase().replace(/'/gi, "''"),
            details.prodDomain.toUpperCase().replace(/'/gi, "''"),
            details.web.toUpperCase().replace(/'/gi, "''"),
            details.email.toUpperCase(),
            details.phoneNo,
            details.city.toUpperCase().replace(/'/gi, "''"),
            details.country.toUpperCase().replace(/'/gi, "''"),
            details.about.toUpperCase().replace(/'/gi, "''")
          );
          const succ = await registerOps.employerRegister(
            employer,
            await bcrypt.hash(details.password, 5)
          );
          res.status(201).json({ Status: `${succ}` }); //, token: generateToken(details.email, details.role) });
        }
      } else {
        res.status(400).json({ message: "Invalid role." });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
// const generateToken = (email,role) => {
//   return jwt.sign({ email,role  }, process.env.JWT_SECRET, { expiresIn: "300s" });
// };
