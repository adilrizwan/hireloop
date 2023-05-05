export const genderArr = ["MALE", "FEMALE", "OTHER"];
export const settings = ['Dashboard', 'Profile', 'Logout'];
export const companyTypeArr = ["Pvt Ltd.", "LLC", "Inc", "Other"];
export const years = Array.from(
  { length: new Date().getFullYear() - 999 },
  (_, i) => new Date().getFullYear() - i
);
export const fieldNames = ["title", "salary", "experience", "location", "jobDesc", "currency", "employmentType", "qualifications"];
