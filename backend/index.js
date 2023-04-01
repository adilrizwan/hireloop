const express = require("express");
require("dotenv").config();

const loginRoutes = require("./routes/loginRoutes");
const adminRoutes = require("./routes/adminRoutes");
const employerRoutes = require("./routes/employerRoutes");
const applicantRoutes = require("./routes/applicantRoutes");

const {connectMSSQL} = require("./db/sqlConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

connectMSSQL();

app.use("/login", loginRoutes)
app.use("/admin", adminRoutes)
app.use("/employer", employerRoutes);
app.use("/applicant", applicantRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.underline.yellow);
});