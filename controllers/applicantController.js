const appOps = require("../db/appOps");
const { jsPDF } = require("jspdf");
exports.getProfile = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const profile = await appOps.getProfile(req.user.id);
      const j = JSON.stringify(profile.DOB);
      profile.DOB = j.split("T")[0];
      profile.DOB = profile.DOB.split('"')[1];
      res.json(profile);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.updateProfile = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const post = req.body;
      if (!post.highestEducation) {
        post.highestEducation = "NULL";
      }
      if (!post.major) {
        post.major = "NULL";
      }
      if (!post.institution) {
        post.institution = "NULL";
      }
      if (!post.phoneNo) {
        post.phoneNo = "NULL";
      }
      if (!post.city) {
        post.city = "NULL";
      }
      if (!post.bio) {
        post.bio = "NULL";
      }
      const update = await appOps.updateProfile(req.user.id, post);
      if (update === 1) {
        res.status(200).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Post not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.apply = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const apply = await appOps.apply(req.params.id, req.user.id);
      if (apply === 0) {
        res.status(403).json({ message: "Already applied" });
      } else if (apply === 1) {
        res.status(201).json({ message: "Success" });
      } else if (apply === 2) {
        res.status(204).json({ message: "Invalid Job" });
      } else {
        res.status(400).json({ message: "Error" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
exports.dashboard = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const apply = await appOps.dashboard(req.user.id);
      if (typeof apply[0][0] === "undefined") {
        res.status(204).json({ message: "You haven't applied to any jobs" });
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
exports.searchJobByTitle = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const title = req.query.title;
      const jobs = await appOps.searchJobByTitle(title);
      res.send(jobs);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    req.status(401).json({ message: "Unauthorized" });
  }
};
exports.searchJobsMult = async (req, res) => {
  if (req.user.role === "Applicant" || req.user.role === "Admin") {
    try {
      const param = req.query;
      const columns = Object.keys(param);
      const values = Object.values(param);
      const jobs = await appOps.searchJobsMult(columns, values);
      res.send(jobs);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  } else {
    req.status(401).json({ message: "Unauthorized" });
  }
};
exports.generateCV = async (req, res) => {
  if (req.user.role === "Applicant") {
    try {
      const profile = await appOps.getProfile(req.user.id);
      const doc = new jsPDF();
      let yPos = 15;
      for (const [key, value] of Object.entries(profile)) {
        if (key === "id") {
          doc.setFont("Helvetica", "Bold");
          doc.setFontSize(25);
          doc.text("hireloop", 10, yPos);
          yPos += 5;
          doc.setFont("helvetica", "bolditalic");
          doc.setFontSize(11);
          doc.text("happy hiring", 15, yPos);
          yPos += 15;
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.text(`${key}: ${value}`, 10, yPos);
          yPos += 10;
        }
      }
      doc.save(`hireloop_CV_${profile.lastName}.pdf`);
      res.status(201).json({ message: "Success." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error" });
    }
  } else {
    req.status(401).json({ message: "Unauthorized" });
  }
};
