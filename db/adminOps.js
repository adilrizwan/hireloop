// const config = require("./sqlConfig");
// const mssql = require("mssql");
const { pool } = require("./sqlConfig");

exports.getApplicants = async () => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(`SELECT * from Applicant`);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getEmployers = async () => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(`SELECT * from Employer`);
    // console.log(query.recordset)
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.deleteUser = async (id, role) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`exec deleteUser '${id}','${role}'`);
    if (query.rowsAffected[0] === 0) {
      return "No such record exists.";
    } else if (query.rowsAffected[0] === 1) {
      return "Success.";
    } else {
      return "Phattgaya";
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getApplicantbyID = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Applicant where id = '${id}'`);
    // console.log("Query: " +query.recordset)
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getEmployerbyID = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Employer where id = '${id}'`);
    // console.log("Query: " +query.recordset)
    // console.log(email)
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getApplicantbyEmail = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Applicant where email = '${email}'`);
    // console.log("Query: " +query.recordset)
    // console.log(email)
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getEmployerbyEmail = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Employer where email = '${email}'`);
    // console.log("Query: " +query.recordset)
    // console.log(email)
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getAllJobs = async () => {
  try {
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from JobOpenings`);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getApplicationLog = async () => {
  try {
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`exec getApplicationLog`);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.applicantDashboard = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(`exec appliedJobs '${id}'`);
    // console.log(query.recordset[0]);
    return query.recordsets;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.deleteJob = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(`DELETE FROM JobOpenings WHERE job_id = ${id}'`);
    // console.log(query.recordset[0]);
    return query.recordsets;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};