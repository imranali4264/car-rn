const Rental = require("./models/Rental");
const User = require("./models/User");

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: "Swift",
        city: "karachi",
        color: "Red",
        type: "HatchBack",
        shared: false,
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        description: "Very nice car in center of the city.",
        hourRate: 13
      },
      {
        title: "Range Rover",
        city: "karachi",
        color: "Black",
        type: "SUV",
        shared: true,
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        description: "Very nice Suv in city.",
        hourRate: 43
      },
      {
        title: "GLI",
        city: "hyderabad",
        color: "White",
        type: "Sedan",
        shared: true,
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        description: "Very Nice Condition.",
        hourRate: 16
      }
    ];
    this.users = [
      {
        username: "ahsan",
        email: "ahsan@example.com",
        password: "123456"
      }
    ];
  }

  async cleanDb() {
    await User.deleteMany();
    await Rental.deleteMany();
  }
  pushDataToDb() {
    const user = new User(this.users[0]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;

      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
