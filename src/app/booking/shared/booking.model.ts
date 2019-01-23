import { Rental } from "../../rental/shared/rental.model";

export class Booking {
  static readonly BOOKING_DATES_FORMAT = "Y/MM/DD";

  _id: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  passengers: number;
  hours: number;
  days: number;
  totalHours: number;
  totalP: number;
  createdAt: string;
  rental: Rental;
}
