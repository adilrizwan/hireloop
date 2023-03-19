const csv = require("csv-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");

// Read the CSV file
fs.createReadStream("./Schemas/MOCK_DATA_APPLICANTS.csv")
  .pipe(csv())
  .on("data", async (row) => {
    // Hash the password using bcrypt with 5 salt rounds
    // const hashedPassword = await bcrypt.hash(row.password, 5);
    // const hashedPassword = await bcrypt.hash(row.password, 5);

    // Replace the plaintext password with the hashed password in the CSV file
    // row.password = hashedPassword;

    // row.firstName = row.firstName.toUpperCase();
    // row.lastName = row.lastName.toUpperCase();
    // row.gender = row.gender.toUpperCase();
    // // row.institution = row.institution.toUpperCase();
    // row.gender = row.gender.toUpperCase();
    // row.email = row.email.toUpperCase();
    // row.hqCity = row.hqCity.toUpperCase();
    // row.hqCountry = row.hqCountry.toUpperCase();
    // Write the updated row back to the CSV file
    const outputStream = await fs.createWriteStream(
      "./Schemas/MOCK_DATA_APPLICANTS1.csv",
      { flags: "a" }
    );
    await outputStream.write(
      `${row.id},${row.firstName},${row.lastName},${row.gender},${row.DOB},${row.highestEducation}
      ,${row.major},${row.institution},${row.email},${row.phoneNo},${row.hqCity},${row.hqCountry}\n`
      
    );
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });