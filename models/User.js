import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail, // passing the reference
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    maxlength: 20,
    default: "lastName",
    trim: true,
  },
  location: { type: String, trim: true, maxlength: 20, default: "Indore" },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths()); // returns values which are different from which we have in database

  if (!this.isModified("password")) return; // true for update user
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch; // Boolean value
};

export default mongoose.model("User", UserSchema);
