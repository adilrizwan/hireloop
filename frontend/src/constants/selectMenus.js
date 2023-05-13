export const genderArr = ["MALE", "FEMALE", "OTHER"];
export const settings = ['Dashboard', 'Logout'];
export const companyTypeArr = ["PVT LTD", "LLC", "INC", "OTHER"];
export const years = Array.from(
  { length: new Date().getFullYear() - 999 },
  (_, i) => new Date().getFullYear() - i
);
export const fieldNames = ["title", "salary", "experience", "location", "jobDesc", "currency", "employmentType", "qualifications"];
export const appFieldNames = ["firstName", "lastName", "email", "phoneNo"];
export const empFieldNames = ["companyName", "email", "phoneNo", "website"];