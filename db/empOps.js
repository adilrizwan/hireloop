// const config = require("./sqlConfig");
const sql = require("mssql");
const { pool } = require("./sqlConfig");

exports.getProfile = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * from Employer where id = @id`);
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
    let query = await poolS;
    const request = query.request();
    request.input("company_id", sql.Int, post.company_id);
    request.input("title", sql.VarChar, post.title);
    request.input("employmentType", sql.VarChar, post.employmentType);
    request.input("experience", sql.Int, post.experience);
    request.input("qualifications", sql.VarChar, post.qualifications);
    request.input("currency", sql.VarChar, post.currency);
    request.input("salary", sql.Money, post.salary);
    request.input("location", sql.VarChar, post.location);
    request.input("deadline", sql.Date, post.deadline);
    request.input("jobDesc", sql.VarChar, post.jobDesc);
    const result = await request.query(
      "INSERT INTO JobOpenings (company_id, title, employmentType, experience, qualifications, currency, salary, location, dateCreated, deadline, jobDesc) VALUES (@company_id, @title, @employmentType, @experience, @qualifications, @currency, @salary, @location, GETDATE(), @deadline, @jobDesc)"
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
      .request().input("id", sql.Int, id)
      .query(`SELECT * from JobOpenings where company_id = @id`);
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
    let query = await poolS
      .request()
      .input("postID", sql.Int, postID)
      .input("empID", sql.Int, empID)
      .query(`exec deletePost @postID, @empID`);
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
    let query = await poolS;
    const request = query.request();
    request.input('jobID', sql.Int, jobID);
    request.input('empID', sql.Int, empID);
    request.input('appID', sql.Int, body.appID);
    request.input('status', sql.VarChar, body.status.toUpperCase());
    const result = await request.query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE (job_id = @jobID and company_id = @empID))
                                          BEGIN   
                                            IF EXISTS (SELECT 1 FROM ApplicationLog WHERE job_id = @jobID AND app_id = @appID )
                                              BEGIN
                                                UPDATE ApplicationLog set status = @status WHERE job_id = @jobID AND app_id = @appID
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
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
      return 1;
    } else if (result.recordset[0][""] === 2) {
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
exports.updatePost = async (empID , postID , post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
    const request = query.request();
    const result = await request
    .input('postID', sql.Int, postID)
    .input('empID', sql.Int, empID)
    .input('title', sql.VarChar, post.title.toUpperCase())
    .input('employmentType', sql.VarChar, post.employmentType.toUpperCase())
    .input('experience', sql.Int, post.experience)
    .input('qualifications', sql.VarChar, post.qualifications.toUpperCase())
    .input('currency', sql.VarChar, post.currency.toUpperCase())
    .input('salary', sql.Int, post.salary)
    .input('location', sql.VarChar, post.location.toUpperCase())
    .input('deadline', sql.Date, post.deadline)
    .input('jobDesc', sql.VarChar, post.jobDesc.toUpperCase())
    .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE job_id = @postID AND company_id = @empID)
            BEGIN
            UPDATE JobOpenings SET title = @title, employmentType = @employmentType, experience = @experience,
            qualifications = @qualifications, currency = @currency, salary = @salary, location = @location,
            deadline = @deadline, jobDesc = @jobDesc WHERE job_id = @postID
            SELECT 1
            END
            ELSE
            BEGIN
            SELECT 0
            END`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
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
    let query = await poolS
    const request = query.request()
    
    const result = await request
      .input('id', sql.Int, id)
      .input('companyName', sql.VarChar, post.companyName.toUpperCase())
      .input('estdYear', sql.Int, post.estdYear)
      .input('noOfEmployees', sql.Int, post.noOfEmployees)
      .input('companyType', sql.VarChar, post.companyType.toUpperCase())
      .input('productDomain', sql.VarChar, post.productDomain.toUpperCase())
      .input('website', sql.VarChar, post.website.toUpperCase())
      .input('phoneNo', sql.VarChar, post.phoneNo)
      .input('hqCity', sql.VarChar, post.hqCity.toUpperCase())
      .input('hqCountry', sql.VarChar, post.hqCountry.toUpperCase())
      .input('about', sql.VarChar, post.about.toUpperCase())
      .query(`IF EXISTS (SELECT 1 FROM Employer WHERE id = @id)
              BEGIN
                UPDATE Employer SET 
                  companyName = @companyName, 
                  estdYear = @estdYear, 
                  noOfEmployees = @noOfEmployees, 
                  companyType = @companyType, 
                  productDomain = @productDomain, 
                  website = @website, 
                  phoneNo = @phoneNo, 
                  hqCity = @hqCity, 
                  hqCountry = @hqCountry, 
                  about = @about 
                WHERE id = @id
                SELECT 1
              END
              ELSE
              BEGIN
                SELECT 0
              END`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
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
      .input("jobID", sql.Int, jobID)
      .input("empID", sql.Int, empID)
      .query(`exec GetJobAndApplicantDetails @jobID, @empID`);
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
