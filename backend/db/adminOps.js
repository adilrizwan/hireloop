// const config = require("./sqlConfig");
const sql = require("mssql");
const paginate = require("../middleware/pagination");
const { pool } = require("./sqlConfig");

exports.search = async (role, col, key, offset, pageSize) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("role", sql.VarChar, role)
      .input("col", sql.VarChar, col)
      .input("key", sql.VarChar, key)
      .input("offset", sql.Int, offset)
      .input("pageSize", sql.Int, pageSize)
      .query(`exec SearchBroadTable @role,@col,@key,@offset,@pageSize`);
    const fetched = await paginate.resultCount(offset, query.recordsets[1].length, query.recordsets[0][0]["TOTAL"] )
    return {
      Results: "Showing " + fetched + " of " + query.recordsets[0][0]["TOTAL"] + " records",
      Records: query.recordsets[1]
    };
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
exports.getApplicationLog = async (role, id, offset, pageSize) => {
  try {
    // var fetched;
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("role", sql.VarChar, role)
      .input("id", sql.Int, id)
      .input("offset", sql.Int, offset)
      .input("pageSize", sql.Int, pageSize)
      .query(`exec getApplicationLog @role, @id, @offset, @pageSize`);
      const fetched = await paginate.resultCount(offset,query.recordsets[1].length,query.recordsets[0][0].TOTAL)
      const response = {
          Results: "Showing " + 
           fetched +
          " of " +
          query.recordsets[0][0].TOTAL +
          " results",
        ApplicationLog: query.recordsets[1],
      };
      return response;
    // return query.recordsets[0][0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.applicantDashboard = async (id, offset, pageSize) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("id", sql.Int, id)
      .input("offset", sql.Int, offset)
      .input("pageSize", sql.Int, pageSize)
      .query(`exec getApplicantDashboard @id, @offset, @pageSize`);
    const fetched = await paginate.resultCount(offset,query.recordsets[2].length,query.recordsets[1][0].TOTAL)
    const response = {
      "Applicant Name": query.recordsets[0][0].applicantName,
      Results:
        "Showing " +
        fetched +
        " of " +
        query.recordsets[1][0].TOTAL +
        " results",
      Applications: query.recordsets[2],
    };
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
