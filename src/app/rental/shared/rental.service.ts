import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Rental } from "./rental.model";

@Injectable()
export class RentalService {
  private rentals: Rental[] = [
    {
      id: "1",
      title: "Swift",
      color: "red",
      city: "karachi",
      type: "Hatchback",
      image: "http://via.placeholder.com/350x250",
      description: "very nice condition",
      hourRate: 11,
      createdAt: "13/11/2017",
      shared: false
    },
    {
      id: "2",
      title: "Honda City",
      color: "black",
      city: "karachi",
      type: "Sedan",
      image: "http://via.placeholder.com/350x250",
      description: "very nice condition",
      hourRate: 19,
      createdAt: "02/12/2017",
      shared: false
    },
    {
      id: "3",
      title: "Land Rover",
      color: "silver",
      city: "karachi",
      type: "SUV",
      image: "http://via.placeholder.com/350x250",
      description: "very nice condition",
      hourRate: 39,
      createdAt: "27/12/2017",
      shared: false
    },
    {
      id: "4",
      title: "Mercedes-Benz",
      color: "white",
      city: "karachi",
      type: "Coupe",
      image: "http://via.placeholder.com/350x250",
      description: "very nice condition",
      hourRate: 38,
      createdAt: "21/11/2017",
      shared: false
    }
  ];

  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>(observer => {
      setTimeout(() => {
        const foundRental = this.rentals.find(rental => {
          return rental.id == rentalId;
        });
        observer.next(foundRental);
      }, 500);
    });
  }

  public getRentals(): Observable<Rental[]> {
    return new Observable<Rental[]>(Observer => {
      setTimeout(() => {
        Observer.next(this.rentals);
      }, 1000);
    });
  }
}
