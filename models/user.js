const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        minlength: 6,
        required: true,
      },
      role: {
        type: String,
        default: "Basic",
        required: true,
      },
});
module.exports = mongoose.model("User", UserSchema);
