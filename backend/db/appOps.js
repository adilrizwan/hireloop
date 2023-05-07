// const config = require("./sqlConfig");
const sql = require("mssql");
const { pool } = require("./sqlConfig");
const paginate = require("../middleware/pagination");

exports.getProfile = async (id) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * from Applicant where id = @id`);
    // console.log(query.recordset[0]);
    return query.recordset[0];
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
    const fetched = await paginate.resultCount(
      offset,
      query.recordsets[2].length,
      query.recordsets[1][0].TOTAL
    );
    return {
      "Applicant Name": query.recordsets[0][0].applicantName,
      Results:
        "Showing " +
        fetched +
        " of " +
        query.recordsets[1][0].TOTAL +
        " results",
      Applications: query.recordsets[2],
    };
    // return response;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.updateProfile = async (id, post) => {
  try {
    // let pool = await mssql.connect(config);
    let poolS = await pool;
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("id", sql.Int, id)
      .input("firstName", sql.VarChar, post.firstName.toUpperCase())
      .input("lastName", sql.VarChar, post.lastName.toUpperCase())
      .input("gender", sql.VarChar, post.gender.toUpperCase())
      .input("DOB", sql.Date, post.DOB)
      .input(
        "highestEducation",
        sql.VarChar,
        post.highestEducation.toUpperCase()
      )
      .input("major", sql.VarChar, post.major.toUpperCase())
      .input("institution", sql.VarChar, post.institution.toUpperCase())
      .input("phoneNo", sql.VarChar, post.phoneNo)
      .input("city", sql.VarChar, post.city.toUpperCase())
      .input("country", sql.VarChar, post.country.toUpperCase())
      .input("bio", sql.VarChar, post.bio.toUpperCase())
      .query(`IF EXISTS (SELECT 1 FROM Applicant WHERE id = @id)
            BEGIN
                UPDATE Applicant SET 
                    firstName = @firstName, 
                    lastName = @lastName,
                    gender = @gender, 
                    DOB = @DOB, 
                    highestEducation = @highestEducation, 
                    major = @major, 
                    institution = @institution, 
                    phoneNo = @phoneNo, 
                    city = @city, 
                    country = @country, 
                    bio = @bio
                WHERE id = @id;
                SELECT 1;
            END
            ELSE
            BEGIN
                SELECT 0;
            END`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
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
    let query = await poolS;
    const request = query.request();
    const result = await request
      .input("jobID", sql.Int, jobID)
      .input("appID", sql.Int, appID)
      .query(`IF EXISTS (SELECT 1 FROM JobOpenings WHERE job_id = @jobID)
            BEGIN
                IF EXISTS (SELECT 1 FROM ApplicationLog WHERE job_id = @jobID AND app_id = @appID)
                BEGIN
                    SELECT 0
                END
                ELSE
                BEGIN
                    DECLARE @com_id int
                    SELECT @com_id = company_id FROM JobOpenings WHERE job_id = @jobID
                    INSERT INTO ApplicationLog (job_id, app_id, company_id, status) VALUES (@jobID, @appID, @com_id, 'PENDING')
                    SELECT 1
                END
            END
            ELSE
            BEGIN
                SELECT 2
            END`);
    if (result.recordset[0][""] === 0) {
      return 0;
    } else if (result.recordset[0][""] === 1) {
      return 1;
    } else if (result.recordset[0][""] === 2) {
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
      .input("parameter", sql.VarChar, parameter)
      .query(`SELECT * from JobOpenings where title like '%@parameter%'`);
    return query.recordset;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};
exports.searchJobsMult = async (columns, values, offset, pageSize) => {
  try {
    if (columns.length ===0 || values.length === 0) {
      let poolS = await pool;
      let query1 = await poolS.query(
        `SELECT COUNT(job_id) AS TOTAL from JobOpenings`
      );
      let query = await poolS
        .request()
        .input("offset", sql.Int, offset)
        .input("pageSize", sql.Int, pageSize)
        .query(`SELECT j.*, e.companyName FROM JobOpenings j JOIN Employer e ON j.company_id = e.id ORDER BY j.job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`);
        // .query(`SELECT j.*, e.companyName from JobOpenings j, Employer e ORDER BY j.job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`);
        // .query(
        //   `SELECT * FROM JobOpenings ORDER BY job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`
        // );
      const fetched = await paginate.resultCount(
        offset,
        query.recordsets[0].length,
        query1.recordset[0]["TOTAL"]
      );
      var result = {
        Results:
          "Showing " +
          fetched +
          " of " +
          query1.recordset[0]["TOTAL"] +
          " results",
        SearchResults: query.recordsets[0],
      };
    } else {
      var i = -1;
      const len = values.length;
      function iterate() {
        while (i < len - 1) {
          i++;
          values[i] = values[i].toUpperCase();
          return values[i];
        }
      }
      // const queryString = `FROM JobOpenings j WHERE ${columns
      const queryString = `FROM JobOpenings j JOIN Employer e ON j.company_id = e.id WHERE ${columns
        .map((col) => `${col} like '%${iterate()}%'`)
        .join(" AND ")}`;
      let poolS = await pool;
      let query1 = await poolS
        .request()
        .query('SELECT COUNT(job_id) AS TOTAL ' + queryString)
      let query = await poolS
        .request()
        .input("offset", sql.Int, offset)
        .input("pageSize", sql.Int, pageSize)
        // .query(`SELECT * ` + queryString +` ORDER BY j.job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`
        .query(`SELECT j.*, e.companyName ` + queryString +` ORDER BY j.job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`
        );
        var fetched = await paginate.resultCount(
          offset,
          query.recordsets[0].length,
          query1.recordset[0]["TOTAL"]
        );
        var result = {
          Results:
            "Showing " +
            fetched +
            " of " +
            query1.recordset[0]["TOTAL"] +
            " results",
          SearchResults: query.recordsets[0],
        };
        console.log(queryString)
      }
      return result;
  } catch (error) {
    console.log(error);
    res.status(400).json({ "DB ERROR": error });
  }
};


// const queryString = `FROM JobOpenings j JOIN Employer e ON j.company_id = e.id WHERE ${columns
//   .map((col) => `j.${col} like '%${iterate()}%'`)
//   .join(" AND ")}`;
// let poolS = await pool;
// let query1 = await poolS
//   .request()
//   .query('SELECT COUNT(j.job_id) AS TOTAL ' + queryString);
// let query = await poolS
//   .request()
//   .input("offset", sql.Int, offset)
//   .input("pageSize", sql.Int, pageSize)
//   .query(`SELECT j.*, e.companyName ` + queryString +` ORDER BY j.job_id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`);
