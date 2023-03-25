const adminOps = require("../db/adminOps");

exports.search = async (req, res) => {
  try {
    if (req.user.role === "ADMIN") {
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
exports.deleteEmployer = async (req, res) => {
  try {
    if (req.user.role === "ADMIN") {
      const id = req.params.id;
      const stat = await adminOps.deleteUser(id, 'Employer');
      res.send(stat);
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
    if (req.user.role === "ADMIN") {
      const id = req.params.id;
      const stat = await adminOps.deleteUser(id, 'Applicant');
      res.send(stat);
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
    if (req.user.role === "ADMIN") {
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
  if (req.user.role === "ADMIN") {
    try {
      const id = req.query.id
      const apply = await adminOps.applicantDashboard(id);
      if (apply.Applications.length === 0) {
        res.json({ "Applicant Name": apply["Applicant Name"], message: "User hasn't applied to any jobs" });
      } else {
        res.send(apply);
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
    if (req.user.role === "ADMIN") {
      const postID = req.params.id;
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