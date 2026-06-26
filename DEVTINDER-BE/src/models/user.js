const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minLength: 4, 
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid")
            }
        }
      
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    },

    age: {
        type: Number,
        min: 18
    },

    gender: {
        type: String,
        enum: ["male", "female", "others"]   
    },

   about: {
    type: String,
    default: "this is default value"
},

photoUrl: {
    type: String,

    default:
      "https://cdn-icons-png.flaticon.com/512/149/149071.png",

    validate(value) {

        if (!value) return;

        if (!validator.isURL(value)) {
            throw new Error("Invalid Photo URL");
        }

    }
}

}, 
{
    timestamps: true
});

userSchema.methods.validatePassword =async function (passwordInputByUser){

    const user =this
    const passwordHash =user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid
}
const User = mongoose.model("User", userSchema);

module.exports = User;