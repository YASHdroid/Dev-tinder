const validator = require("validator");

const validateSignUPData = (data) => {

  const { firstName, emailId, password } = data;

  if (!firstName) {
    throw new Error("firstName is mandatory");
  }
  else if (!validator.isEmail(emailId)) {
    throw new Error("ENTER CORRECT MAIL");
  }
  else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password");
  }
}

module.exports = {
  validateSignUPData
};