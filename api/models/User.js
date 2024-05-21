const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  usertype: { type: String, required: true },
  profilePhoto: { type: Buffer, default: null }, // Use Buffer for binary data
  cv: { type: Buffer, default: null }, // Use Buffer for binary data
  age: { type: Number, default: null }, // Add age field
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
