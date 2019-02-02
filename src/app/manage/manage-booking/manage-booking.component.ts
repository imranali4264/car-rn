import { Component, OnInit } from "@angular/core";
import { BookingService } from "../../booking/shared/booking.service";
import { Booking } from "../../booking/shared/booking.model";

@Component({
  selector: "car-manage-booking",
  templateUrl: "./manage-booking.component.html",
  styleUrls: ["./manage-booking.component.scss"]
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];
  constructor(private bookingservice: BookingService) {}

  ngOnInit() {
    this.bookingservice.getUserBooking().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      () => {}
    );
  }
}
