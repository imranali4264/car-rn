const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const Rental = require("./models/Rental");
const FakeDb = require("./fake-db");

const rentals = require("./routes/rentals");
const users = require("./routes/users");

mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    //fakeDb.seedDb();
  })
  .catch(err => console.log(err));
mongoose.set("useCreateIndex", true);

const app = express();

app.use(bodyParser.json());

app.use("/api/rentals", rentals);
app.use("/api/users", users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
