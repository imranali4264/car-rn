const Rental = require("./models/Rental");
const User = require("./models/User");
const Booking = require("./models/Booking");
const fDbData = require("./data.json");

class FakeDb {
  constructor() {
    this.rentals = fDbData.rentals;
    this.users = fDbData.users;
  }

  async cleanDb() {
    await User.deleteMany();
    await Rental.deleteMany();
    await Booking.deleteMany();
  }
  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
