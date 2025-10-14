import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshTokens: {
    type: [String],//multi device login
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.method.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.JWT_AT_SECRET,
    {
      expiresIn: "15m",
    }
  );
};
userSchema.method.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_RT_SECRET,
        {
          expiresIn: "7d",
        },
    )
};
userSchema.plugin(mongooseAggregatePaginate);
const User = mongoose.model("User", userSchema);
export default User;
