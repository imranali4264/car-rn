const Rental = require("./models/Rental");

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
        city: "karchi",
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
        city: "Hyderabad",
        color: "White",
        type: "sedan",
        shared: true,
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        description: "Very Nice Condition.",
        hourRate: 16
      }
    ];
  }

  async cleanDb() {
    await Rental.deleteMany();
  }
  pushRentalsToDb() {
    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.save();
    });
  }

  seedDb() {
    this.cleanDb();
    this.pushRentalsToDb();
  }
}

module.exports = FakeDb;
