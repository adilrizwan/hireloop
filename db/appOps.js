// const config = require("./sqlConfig");
const { pool } = require("./sqlConfig");

exports.getProfile = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from Applicant where id = ${id}`);
    // console.log(query.recordset[0]);
    return query.recordset[0];
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.dashboard = async (id) => {
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
exports.updateProfile = async (id, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM Applicant WHERE id = ${id})
              BEGIN
              update Applicant set 
      firstName = '${post.firstName.toUpperCase().replace(/'/gi, "''")}', 
      lastName = '${post.lastName.toUpperCase().replace(/'/gi, "''")}',
      gender = '${post.gender.toUpperCase()}', 
      DOB = '${post.DOB}', 
      highestEducation = '${post.highestEducation
        .toUpperCase()
        .replace(/'/gi, "''")}', 
      major = '${post.major.toUpperCase().replace(/'/gi, "''")}', 
      institution = '${post.institution.toUpperCase().replace(/'/gi, "''")}', 
      phoneNo = ${post.phoneNo}, 
      city = '${post.city.toUpperCase().replace(/'/gi, "''")}', 
      country = '${post.country.toUpperCase().replace(/'/gi, "''")}', 
      bio = '${post.bio.toUpperCase().replace(/'/gi, "''")}'
      where id = ${id}
              SELECT 1
              END
              ELSE
              BEGIN
              SELECT 0
              END`);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else {
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.apply = async (jobID, appID) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS.request()
      .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE job_id = ${jobID})
              BEGIN
                IF EXISTS (SELECT 1 FROM ApplicationLog WHERE job_id = ${jobID} AND app_id = ${appID})
                  BEGIN
                        SELECT 0
                  END
                ELSE
                  BEGIN
                      DECLARE @com_id int
                      select @com_id = company_id from JobOpenings where job_id = ${jobID}
                      INSERT INTO ApplicationLog (job_id, app_id, company_id, status) VALUES (${jobID}, ${appID}, @com_id, 'PENDING')
                      SELECT 1
                  END
              END
              ELSE
                  BEGIN
                    SELECT 2
                  END`);
    if (query.recordset[0][""] === 0) {
      return 0;
    } else if (query.recordset[0][""] === 1) {
      return 1;
    } else if (query.recordset[0][""] === 2) {
      return 2;
    } else {
      res.status(400).json({ "DB ERROR": error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.searchJobByTitle = async (parameter) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .query(`SELECT * from JobOpenings where title like '%${parameter}%'`);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.searchJobsMult = async (columns, values) => {
  try {
    if (columns.length === 0 || values.length === 0) {
      const queryString = `SELECT * FROM JobOpenings`;
      let poolS = await pool;
      let query = await poolS.request().query(queryString);
      return query.recordset;
    }
    var i = -1;
    const len = values.length;
    function iterate() {
      while (i < len - 1) {
        i++;
        values[i] = values[i].toUpperCase().replace(/'/gi, "''");
        return values[i];
      }
    }
    const queryString = `SELECT * FROM JobOpenings WHERE ${columns
      .map((col) => `${col} like '%${iterate()}%'`)
      .join(" AND ")}`;
    let poolS = await pool;
    let query = await poolS.request().query(queryString);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
