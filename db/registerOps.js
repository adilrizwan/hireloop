// const config = require("./sqlConfig");
// const mssql = require("mssql");
const { pool } = require("./sqlConfig");

exports.adminRegister = async (admin, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(
        `exec registerAdmin '${admin.role}','${admin.firstName}','${admin.lastName}','${admin.email}','${password}'`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.applicantRegister = async (applicant, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request().query(
      // `exec registerApplicant '${applicant.role}','${applicant.firstName}','${applicant.lastName}','${applicant.gender}',${applicant.birth_year},${applicant.birth_month},${applicant.birth_day},'${applicant.highestEducation}','${applicant.major}','${applicant.institution}','${applicant.email}',${applicant.phoneNo},'${applicant.city}','${applicant.country}','${password}'`
      `exec registerApplicant '${applicant.role}','${applicant.firstName}','${applicant.lastName}','${applicant.gender}','${applicant.DOB}','${applicant.highestEducation}','${applicant.major}','${applicant.institution}','${applicant.email}','${applicant.phoneNo}','${applicant.city}','${applicant.country}','${applicant.bio}','${password}'`
    );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.employerRegister = async (employer, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(
        `exec registerEmployer '${employer.role}','${employer.companyName}',${employer.estdYear},${employer.noOfEmployees},'${employer.type}','${employer.prodDomain}','${employer.web}','${employer.email}','${employer.phoneNo}','${employer.city}','${employer.country}','${employer.about}','${password}'`
      );
    return "Success";
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.userExists = async (email) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT email from Credentials where email = '${email}'`);
    return query.recordsets[0].length;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
