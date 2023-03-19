class applicant {
  constructor(
    role,
    firstName,
    lastName,
    gender,
    DOB,
    highestEducation,
    major,
    institution,
    email,
    phoneNo,
    city,
    country,
    bio
  ) {
    (this.role = role),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.gender = gender),
      (this.DOB = DOB),
      (this.highestEducation = highestEducation),
      (this.major = major),
      (this.institution = institution),
      (this.email = email),
      (this.phoneNo = phoneNo),
      (this.city = city),
      (this.country = country),
      (this.bio = bio);
  }
}

module.exports = applicant;
