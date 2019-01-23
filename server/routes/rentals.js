const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");
const { mongoErrors } = require("../helpers/mongoose");
const UserControl = require("../controllers/user");
const User = require("../models/User");

//get curent user by jwt token
router.get("/secret", UserControl.loginMiddleware, (req, res) => {
  res.json({ secret: true });
});
//get rental by id
router.get("/:id", (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({
          errors: [
            { title: "Rentals Error!", detail: "Counld not find rental!" }
          ]
        });
      }
      return res.json(foundRental);
    });
});

router.post("", UserControl.loginMiddleware, (req, res) => {
  const {
    title,
    city,
    color,
    type,
    shared,
    description,
    image,
    hourRate
  } = req.body;
  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    color,
    type,
    shared,
    description,
    image,
    hourRate
  });
  rental.user = user.userId;
  Rental.create(rental, (err, newRental) => {
    if (err) {
      res.status(422).send({ errors: mongoErrors(err.errors) });
    }
    User.updateOne(
      { _id: user.userId },
      { $push: { rentals: newRental } },
      () => {}
    );
    return res.json(newRental);
  });
});

//get all rentals and search rentals with query for city
router.get("/", (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings")
    .exec((err, foundRentals) => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err.errors) });
      }
      if (city && foundRentals.length === 0) {
        return res.status(404).send({
          errors: [
            {
              title: "No rentals found",
              detail: `There is no rental for this city ${city}`
            }
          ]
        });
      }
      res.json(foundRentals);
    });
});

module.exports = router;
