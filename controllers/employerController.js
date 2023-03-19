const empOps = require("../db/empOps");
const openingStruct = require("../Structures/jobOpenings");

exports.createOpening = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const opening = req.body;
      const post = new openingStruct(
        req.user.id,
        opening.title.toUpperCase().replace(/'/gi, "''"),
        opening.employmentType.toUpperCase().replace(/'/gi, "''"),
        opening.experience,
        opening.qualifications.toUpperCase().replace(/'/gi, "''"),
        opening.currency.toUpperCase().replace(/'/gi, "''"),
        opening.salary,
        opening.location.toUpperCase().replace(/'/gi, "''"),
        opening.deadline,
        opening.jobDesc.toUpperCase().replace(/'/gi, "''")
      );
      await empOps.postOpening(post);
      res.status(201).json({ message: "Success" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getPostings = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const result = await empOps.getPosts(req.user.id);
      res.send(result);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getJobAndApplicantDetails = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const result = await empOps.getJobAndApplicantDetails(
        req.params.id,
        req.user.id
      );
      if (result === 0) {
        res.status(204).json({ message: "Invalid Job" });
      } else {
        res.status(200).send(result);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.getProfile = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const result = await empOps.getProfile(req.user.id);
      res.send(result);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.deletePosting = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const postID = req.params.id;

      const stat = await empOps.deletePost(postID, req.user.id);
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
exports.patchPosting = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const postID = req.params.id;
      const post = req.body;
      const update = await empOps.updatePost(postID, post);
      if (update === 1) {
        res.status(201).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Post not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const post = req.body;
      const update = await empOps.updateProfile(req.user.id, post);
      if (update === 1) {
        res.status(201).json({ message: "Success" });
      } else {
        res.status(204).json({ message: "Post not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role === "Employer") {
      const jobID = req.params.id;
      const body = req.body;
      const update = await empOps.updateApplicationStatus(
        jobID,
        req.user.id,
        body
      );
      if (update === 1) {
        res.status(201).json({ message: "Success" });
      }
      if (update === 2) {
        res.status(204).json({ message: "No Applicants for this job" });
      }
      if (update === 0) {
        res.status(204).json({ message: "Post not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};
