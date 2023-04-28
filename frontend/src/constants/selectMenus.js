export const genderArr = ["Male", "Female", "Other"];
export const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const companyTypeArr = ["Pvt Ltd.", "LLC", "Inc", "Other"];
export const years = Array.from(
  { length: new Date().getFullYear() - 999 },
  (_, i) => new Date().getFullYear() - i
);
export const applicantSide = ["Dashboard", "Find Job", "Download CV", "Update Profile"]
