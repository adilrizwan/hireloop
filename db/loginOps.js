// const config = require("./sqlConfig");
const { pool } = require("./sqlConfig");
// const mssql = require("mssql");

exports.loginOps = async (email, role) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT password from Credentials where email = '${email}' and userRole = '${role}')
                                          BEGIN
                                          --SELECT password from Credentials where email = '${email}' and userRole = '${role}'; SELECT * from ${role} where email = '${email}';
                                          SELECT c.password, a.*
                                          FROM Credentials c
                                          INNER JOIN ${role} a ON c.email = a.email
                                          WHERE c.email = '${email}' and c.userRole = '${role}'
                                          END
                                          ELSE
                                          BEGIN
                                          SELECT 0
                                          END`);
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
