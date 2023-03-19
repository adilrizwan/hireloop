// const config = require("./sqlConfig");
// const mssql = require("mssql");
const { pool } = require("./sqlConfig");

exports.getProfile = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Employer where id = ${id}`);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.postOpening = async (post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(
        `insert into JobOpenings (company_id, title, employmentType, experience, qualifications, currency, salary, location, dateCreated, deadline, jobDesc) values (${post.company_id},'${post.title}','${post.employmentType}', ${post.experience},'${post.qualifications}','${post.currency}',${post.salary},'${post.location}',GETDATE(),'${post.deadline}','${post.jobDesc}')`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getPosts = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from JobOpenings where company_id = ${id}`);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.deletePost = async (postID, empID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE job_id = ${postID} AND company_id = ${empID})
              BEGIN
                DELETE FROM JobOpenings WHERE job_id = ${postID} AND company_id = ${empID};
                SELECT 1
              END
              ELSE
              BEGIN
              SELECT 0
              END
      `);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updateApplicationStatus = async (jobID, empID, body) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE (job_id = ${jobID} and company_id = ${empID}))
                BEGIN   
                  IF EXISTS (SELECT 1 FROM ApplicationLog WHERE job_id = ${jobID} AND app_id = ${
      body.appID
    } )
                    BEGIN
                      UPDATE ApplicationLog set status = '${body.status.toUpperCase()}' WHERE job_id = ${jobID} AND app_id = ${
      body.appID
    }
                      SELECT 1      
                    END
                  ELSE
                    BEGIN
                      SELECT 2
                    END
                END
              ELSE
                BEGIN
                  SELECT 0
                END`);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else if (query.recordset[0][""] === 2) {
      return 2;
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updatePost = async (id, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE job_id = ${id})
              BEGIN
              UPDATE JobOpenings SET title = '${post.title
                .toUpperCase()
                .replace(/'/gi, "''")}', employmentType = '${post.employmentType
      .toUpperCase()
      .replace(/'/gi, "''")}', experience = '${
      post.experience
    }', qualifications = '${post.qualifications
      .toUpperCase()
      .replace(/'/gi, "''")}', currency = '${post.currency
      .toUpperCase()
      .replace(/'/gi, "''")}', salary = ${
      post.salary
    }, location = '${post.location
      .toUpperCase()
      .replace(/'/gi, "''")}', deadline = '${
      post.deadline
    }', jobDesc = '${post.jobDesc
      .toUpperCase()
      .replace(/'/gi, "''")}' WHERE job_id = '${id}'
              SELECT 1
              END
              ELSE
              BEGIN
              SELECT 0
              END`);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updateProfile = async (id, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM Employer WHERE id = ${id})
              BEGIN
              UPDATE Employer SET companyName = '${post.companyName
                .toUpperCase()
                .replace(/'/gi, "''")}', estdYear = ${
      post.estdYear
    }, noOfEmployees = ${post.noOfEmployees}, companyType = '${post.companyType
      .toUpperCase()
      .replace(/'/gi, "''")}', productDomain = '${post.productDomain
      .toUpperCase()
      .replace(/'/gi, "''")}', website = '${post.website
      .toUpperCase()
      .replace(/'/gi, "''")}', phoneNo = ${
      post.phoneNo
    }, hqCity = '${post.hqCity
      .toUpperCase()
      .replace(/'/gi, "''")}', hqCountry = '${post.hqCountry
      .toUpperCase()
      .replace(/'/gi, "''")}', about = '${post.about
      .toUpperCase()
      .replace(/'/gi, "''")}' WHERE id = '${id}'
              SELECT 1
              END
              ELSE
              BEGIN
              SELECT 0
              END`);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getJobAndApplicantDetails = async (jobID, empID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`exec GetJobAndApplicantDetails '${jobID}', '${empID}'`);
    if (query.recordset.length === 0) {
      return 0;
    } else {
      return query.recordsets;
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
