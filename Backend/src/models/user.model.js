import mongoose from 'mongoose'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Becomes true after phone-number verification
    },
    profilePic: {
      type: String,
      default: "", // Can store URL of profile picture
    },
    authMethod: {
      type: String,
      enum: ["phone_otp", "email", "google", "instagram"],
      required: true,
    },
    password: {
      type: String,
      select: false, // Exclude from queries unless explicitly selected
    },
    authId:{
      type:String,
      unique:true,
      sparse:true
    },
    refreshToken:{
        type:String,
        select:false
    },
    resetPasswordOtp:{
      type:String,
      required:false,
      select:false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {

  if (!this.password) {
    throw new Error("Password is missing in the user document");
  }
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      phoneNumber:this.phoneNumber,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  );
};

userSchema.methods.generateEmailVerificationToken = function (){
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.EMAIL_VERIFICATION_SECRET,
    {
      expiresIn: process.env.EMAIL_VERIFICATION_SECRET_EXPIRY,
    }
  );
}


export const User = mongoose.model("User", userSchema);
