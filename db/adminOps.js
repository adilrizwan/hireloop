// const config = require("./sqlConfig");
const sql = require("mssql");
const { pool } = require("./sqlConfig");

exports.search = async (role, col, key) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
    .request()
    .input("role", sql.VarChar, role)
    .input("col", sql.VarChar, col)
    .input("key", sql.VarChar, key)
    .query(`exec SearchTable @role,@col,@key`);
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
      .input("id", sql.Int, id)
      .input("role", sql.VarChar, role)
      .query(`exec deleteUser @id, @role`);
    if (query.rowsAffected[0] === 0) {
      return "No such record exists.";
    } else if (query.rowsAffected[0] === 1) {
      return "Success.";
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.getApplicationLog = async (role, id) => {
  try {
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("role", sql.VarChar, role)
      .input("id", sql.Int, id)
      .query(`exec getApplicationLog @role, @id`);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.applicantDashboard = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
    .request()
    .input("id", sql.Int, id)
    .query(`exec getApplicantDashboard @id`);
    const response = {"Applicant Name" : query.recordsets[0][0].applicantName , "Applications" : query.recordsets[1] }
    return response;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.deletePost = async (postID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
    .request()
    .input("postID", sql.Int, postID)
    .query(`exec deletePostbyAdmin @postID`);
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