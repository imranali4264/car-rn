const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, "too short,character more than 4"],
    max: [32, "too long,character between 4 to 32"]
  },
  email: {
    type: String,
    min: [4, "too short,character more than 4"],
    max: [32, "too long,character between 4 to 32"],
    unique: true,
    lowercase: true,
    required: "Email is Required",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, "too short,character more than 4"],
    max: [32, "too long,character between 4 to 32"],
    required: "Password is required"
  },
  rentals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rental"
    }
  ],
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  ]
});
//compare bcrypt password with requestedpassword
userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
};

//bcryt password and save to db
userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);
