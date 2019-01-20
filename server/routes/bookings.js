const express = require("express");
const router = express.Router();

const UserControl = require("../controllers/user");
const BookingControl = require("../controllers/booking");

router.post("", UserControl.loginMiddleware, BookingControl.createBooking);

module.exports = router;
