// const config = require("./sqlConfig");
const { pool } = require("./sqlConfig");
const sql = require("mssql");

exports.loginOps = async (email, role) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
    .request()
    .input("email", sql.VarChar, email)
    .input("role", sql.VarChar, role)
    .query(`exec loginUser @email, @role`)
    if (query.recordset[0][""] === 0) {
      return query.recordset[0][""];
    } else if (query.recordset[0]) {
      return query.recordset[0];
    } else {
      console.log(error);
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
