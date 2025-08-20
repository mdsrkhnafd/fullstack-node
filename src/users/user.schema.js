const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
    trim: true,
    maxlength: [50, "firstName must be less than 50 characters"],
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    maxlength: [50, "lastName must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: () => `Please enter a valid email address`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const User = model("User", userSchema);

module.exports = User;


/**
 * @swagger
 * 
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *      - firstName
 *      - email
 *      - password
 *    properties:
 *      firstName:
 *        type: string
 *        description: The first name of the user
 *        maxLength: 100
 *      lastName:
 *        type: string
 *        description: The last name of the user
 *        maxLength: 100
 *      email:
 *        type: string
 *        description: A valid email address
 *        format: email
 *      password:
 *        type: string
 *        description: Password must be 8 characters and also a number, a capital letter and a special character
 *    example:
 *      firstName: "John"
 *      lastName: "Doe"
 *      email: "john@me.com"
 *      password: "Password123#"
 *        
 * */  