const adminOps = require("../db/adminOps");

exports.getApplicants = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const applicantData = await adminOps.getApplicants();
      res.send(applicantData);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getEmployers = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const employerData = await adminOps.getEmployers();
      res.send(employerData);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.deleteApplicant = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const appID = req.params.id;
      const stat = await adminOps.deleteUser(appID, "Applicant");
      res.send(stat);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.deleteEmployer = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const empID = req.params.id;
      const stat = await adminOps.deleteUser(empID, "Employer");
      res.send(stat);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getApplicantbyID = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const id = req.params.id;
      const appData = await adminOps.getApplicantbyID(id);
      if (typeof appData === 'undefined') {
        res.status(204).json({ message: "No such Applicant exists" });
      } else {
        res.send(appData);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getApplicantbyEmail = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const email = req.query.email;
      const appData = await adminOps.getApplicantbyEmail(email);
      if (typeof appData === 'undefined') {
        res.status(204).json({ message: "No such Applicant exists" });
      } else {
        res.send(appData);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getEmployerbyEmail = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const email = req.query.email;
      const appData = await adminOps.getEmployerbyEmail(email);
      if (typeof appData === 'undefined') {
        res.status(204).json({ message: "No such Employer exists" });
      } else {
        res.send(appData);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getEmployerbyID = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const id = req.params.id;
      const empData = await adminOps.getEmployerbyID(id);
      if (typeof empData === "undefined") {
        res.status(204).json({ message: "No such Employer exists" });
      } else {
        res.send(empData);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getAllJobs = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const result = await adminOps.getAllJobs();
      res.send(result);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getApplicationLog = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const result = await adminOps.getApplicationLog();
      res.send(result);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.applicantDashboard = async (req, res) => {
  if (req.user.role === "Admin") {
    try {
      const id = req.params.id
      const apply = await adminOps.applicantDashboard(id);
      if (typeof apply[0][0] === "undefined") {
        res.status(204).json({ message: "User hasn't applied to any jobs" });
      } else {
        res.send(apply[0]);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};