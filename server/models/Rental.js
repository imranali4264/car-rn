const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  city: { type: String, required: true, lowercase: true },
  type: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  color: { type: String, required: true },
  shared: Boolean,
  description: { type: String, required: true },
  hourRate: Number,
  createdAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Rental", rentalSchema);
