// const config = require("./sqlConfig");
const sql = require("mssql");
const { pool } = require("./sqlConfig");

exports.adminRegister = async (admin, password) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input('firstName', sql.VarChar, admin.firstName)
      .input('lastName', sql.VarChar, admin.lastName)
      .input('email', sql.VarChar, admin.email)
      .input('password', sql.VarChar, password)
      .query(
        `exec registerAdmin @firstName,@lastName,@email,@password`
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
    let query = await poolS
    const request = query.request()
    const result = await request
      .input('firstName', sql.VarChar, applicant.firstName)
      .input('lastName', sql.VarChar, applicant.lastName)
      .input('gender', sql.VarChar, applicant.gender)
      .input('DOB', sql.Date, applicant.DOB)
      .input('highestEducation', sql.VarChar, applicant.highestEducation)
      .input('major', sql.VarChar, applicant.major)
      .input('institution', sql.VarChar, applicant.institution)
      .input('email', sql.VarChar, applicant.email)
      .input('phoneNo', sql.VarChar, applicant.phoneNo)
      .input('city', sql.VarChar, applicant.city)
      .input('country', sql.VarChar, applicant.country)
      .input('bio', sql.VarChar, applicant.bio)
      .input('password', sql.VarChar, password)
      .query(
        `exec registerApplicant @firstName, @lastName, @gender, @DOB, @highestEducation, @major, @institution, @email, @phoneNo, @city, @country, @bio, @password`
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
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("companyName", sql.VarChar, employer.companyName)
      .input("estdYear", sql.Int, employer.estdYear)
      .input("noOfEmployees", sql.Int, employer.noOfEmployees)
      .input("type", sql.VarChar, employer.type)
      .input("prodDomain", sql.VarChar, employer.prodDomain)
      .input("web", sql.VarChar, employer.web)
      .input("email", sql.VarChar, employer.email)
      .input("phoneNo", sql.VarChar, employer.phoneNo)
      .input("city", sql.VarChar, employer.city)
      .input("country", sql.VarChar, employer.country)
      .input("about", sql.VarChar, employer.about)
      .input("password", sql.VarChar, password)
      .query(
        `exec registerEmployer @companyName, @estdYear, @noOfEmployees, @type, @prodDomain, @web, @email, 
        @phoneNo, @city, @country, @about, @password`
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
      .input("email", sql.VarChar, email)
      .query(`SELECT email from Credentials where email = @email`);
      return query.recordsets[0].length;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
