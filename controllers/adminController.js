const adminOps = require("../db/adminOps");

exports.search = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const param = req.query;
      const columns = Object.keys(param);
      const values = Object.values(param);
      if(typeof columns[1] === 'undefined'){
        columns[1] = 'NULL'
        values[1] = 'NULL'
      }
      const data = await adminOps.search(values[0], columns[1] , values[1]);
      res.send(data);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
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
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const param = req.query;
      const columns = Object.keys(param);
      const values = Object.values(param);
      if(typeof columns[1] === 'undefined'){
        columns[1] = 'NULL'
        values[1] = 'NULL'
      }
      const stat = await adminOps.deleteUser(values[1], values[0]);
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
      var params = req.query.id
      if(typeof params === 'undefined'){
        params = -1
      }
      const result = await adminOps.getApplicationLog(req.user.role, params);
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
      const id = req.query.id
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
exports.deleteJob = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const postID = req.query.id;
      const stat = await adminOps.deletePost(postID);
      if (stat === 0) {
        res.status(204).json({ message: "Post not found" });
      } else {
        res.status(201).json({ message: "Success" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};