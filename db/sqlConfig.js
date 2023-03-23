const mssql = require("mssql");
const colors = require("colors")

const config = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  // database: "JobPortal",
  database: "hireloop",
  options: {
    trustServerCertificate: true,
    trustedconnection: false,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
};

const pool = mssql.connect(config);
const connectMSSQL = async () => {
  try {
    if (await pool !== undefined) {
      console.log("Connected to SQL Server".underline.magenta);
    }
  } catch (error) {
    console.log(error);
  }
};
// module.exports = config;
module.exports = { pool, connectMSSQL };