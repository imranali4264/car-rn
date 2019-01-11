const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const Rental = require("./models/Rental");
const FakeDb = require("./fake-db");

const rentals = require("./routes/rentals");

mongoose
  .connect(
    config.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  })
  .catch(err => console.log(err));

const app = express();

app.use("/api/rentals", rentals);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
