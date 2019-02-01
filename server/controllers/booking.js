const Booking = require("../models/Booking");
const Rental = require("../models/Rental");
const User = require("../models/User");
const { mongoErrors } = require("../helpers/mongoose");
const moment = require("moment");

exports.createBooking = (req, res) => {
  const {
    startAt,
    endAt,
    totalPrice,
    passengers,
    hours,
    days,
    rental
  } = req.body;
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    passengers,
    hours,
    days
  });

  Rental.findById(rental._id)
    .populate("bookings")
    .populate("user")
    .exec((err, foundRental) => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err.errors) });
      }
      if (foundRental.user.id === user.userId) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid User!",
              detail: "Cannot booking on your own rental"
            }
          ]
        });
      }
      //check booking for valid
      if (isValidBooking(booking, foundRental)) {
        booking.user = user.userId;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);

        booking.save(err => {
          if (err) {
            return res.status(422).send(err);
          }

          foundRental.save();
          User.updateMany(
            { _id: user.userId },
            { $push: { bookings: booking } },
            () => {}
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid Booking!",
              detail: "Chosen dates already taken"
            }
          ]
        });
      }
    });
};

exports.getUserBookings = (req, res) => {
  const user = res.locals.user;
  //console.log(user);
  Booking.where("user", user.userId)
    .populate("rental")
    .exec((err, foundBookings) => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err.errors) });
      }
      return res.json(foundBookings);
    });
};

isValidBooking = (proposedBooking, rental) => {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);

      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
};
