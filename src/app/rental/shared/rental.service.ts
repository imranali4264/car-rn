import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rental } from "./rental.model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RentalService {
  constructor(private http: HttpClient) {}
  //get all rentals
  public getRentalById(rentalId: string): Observable<any> {
    return this.http.get("/api/rentals/" + rentalId);
  }
  //get rental by id
  public getRentals(): Observable<any> {
    return this.http.get("/api/rentals");
  }
}
