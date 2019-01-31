import { Booking } from "../../booking/shared/booking.model";
export class Rental {
  static readonly TYPE = ["Sedan", "Hatch Back", "SUV"];

  _id: string;
  title: string;
  color: string;
  city: string;
  type: string;
  image: string;
  description: string;
  hourRate: number;
  createdAt: string;
  shared: boolean;
  bookings: Booking[];
}
