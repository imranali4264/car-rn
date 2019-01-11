const express = require("express");
const router = express.Router();
const Rental = require("../models/Rental");

router.get("/", (req, res) => {
  Rental.find({}, (err, rentals) => {
    res.json(rentals);
  });
});

router.get("/:id", (req, res) => {
  const rentalId = req.params.id;
  Rental.findById(rentalId, (err, rental) => {
    if (err) {
      res
        .status(422)
        .send({
          errors: [
            { title: "Rentals Error!", detail: "Counld not find rental!" }
          ]
        });
    }
    res.json(rental);
  });
});

module.exports = router;
