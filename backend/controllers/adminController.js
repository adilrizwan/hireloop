const adminOps = require("../db/adminOps");
const paginate = require("../middleware/pagination");

exports.search = async (req, res) => {
  try {
    if (req.user.role === "ADMIN") {
      const page = req.query.page 
      const param = req.query;
      const table = param.role
      delete param.role
      if(typeof page!== 'undefined'){
        delete param.page
      }
      const columns = Object.keys(param);
      const values = Object.values(param);
      if (typeof columns[0] === "undefined") {
        columns[0] = "NULL";
        values[0] = "NULL";
      }
      const pages = await paginate.paginate(page);
      const data = await adminOps.search(
        table,
        columns[0],
        values[0],
        pages.start,
        pages.limit
      );
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
      const stat = await adminOps.deleteUser(id, "Employer");
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
      const stat = await adminOps.deleteUser(id, "Applicant");
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
      var params = req.query.id;
      if (typeof params === "undefined") {
        params = -1;
      }
      const pages = await paginate.paginate(req.query.page);
      const result = await adminOps.getApplicationLog(
        req.user.role,
        params,
        pages.start,
        pages.limit
      );
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
      const id = req.query.id;
      const pages = await paginate.paginate(req.query.page);
      const apply = await adminOps.applicantDashboard(
        id,
        pages.start,
        pages.limit
      );
      if (apply.Applications.length === 0) {
        res.json({
          ApplicantName: apply["ApplicantName"],
          message: "No activity to show",
        });
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
