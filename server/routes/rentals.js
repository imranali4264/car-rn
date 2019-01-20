const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");
const UserControl = require("../controllers/user");

//get curent user by jwt token
router.get("/secret", UserControl.loginMiddleware, (req, res) => {
  res.json({ secret: true });
});
//get all rentals
router.get("/", (req, res) => {
  Rental.find({})
    .select("-bookings")
    .exec((err, foundRental) => {
      res.json(foundRental);
    });
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

module.exports = router;
