// const config = require("./sqlConfig");
// const mssql = require("mssql");
const { pool } = require("./sqlConfig");

exports.search = async (role, param, key) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(`exec SearchTable '${role}','${param}','${key}'`);
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
      .query(`exec getApplicationLog '${role}', '${id}'`);
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
    let query = await poolS.request().query(`exec appliedJobs '${id}'`);
    // console.log(query.recordset[0]);
    return query.recordsets;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.deletePost = async (postID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`exec deletePostbyAdmin '${postID}'`);
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