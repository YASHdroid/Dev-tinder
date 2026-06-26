const validator = require("validator");

const validateSignUPData = (data) => {

const {
firstName,
emailId,
password,
photoUrl,
} = data;

if (!firstName) {
throw new Error(
"firstName is mandatory"
);
}

if (!validator.isEmail(emailId)) {
throw new Error(
"ENTER CORRECT MAIL"
);
}

if (
!validator.isStrongPassword(
password
)
) {
throw new Error(
"Enter strong password"
);
}

/* NEW */

if (
photoUrl &&
!validator.isURL(photoUrl)
) {
throw new Error(
"Invalid Photo URL"
);
}

};

const ValidateEditProfileData =
(req) => {

const allowedEditFields = [
  "firstName",
  "lastName",
  "gender",
  "age",
  "photoUrl",
  "about",
];

const isEditAllowed =
Object.keys(req.body)
.every((field)=>

allowedEditFields
.includes(field)

);

return isEditAllowed;

};

module.exports = {
validateSignUPData,
ValidateEditProfileData
};