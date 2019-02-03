import { Component, OnInit } from "@angular/core";
import { Rental } from "../shared/rental.model";
import { RentalService } from "../shared/rental.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "car-rental-create",
  templateUrl: "./rental-create.component.html",
  styleUrls: ["./rental-create.component.scss"]
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalType = Rental.TYPE;
  errors: any[] = [];
  constructor(private rentalService: RentalService, private router: Router) {}
  handleImageChange() {
    this.newRental.image =
      "https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=car-macro-mini-cooper-35967.jpg&fm=jpg";
  }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }
  createRental() {
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResonse: HttpErrorResponse) => {
        this.errors = errorResonse.error.errors;
      }
    );
  }
}
