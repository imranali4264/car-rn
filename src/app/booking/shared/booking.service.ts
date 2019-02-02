import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "./booking.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BookingService {
  constructor(private http: HttpClient) {}
  //create booking
  public createBooking(booking: Booking): Observable<any> {
    return this.http.post("/api/bookings", booking);
  }
  public getUserBooking(): Observable<any> {
    return this.http.get("/api/bookings/manage");
  }
}
