import { Component, OnInit } from "@angular/core";
import { RentalService } from "../../rental/shared/rental.service";
import { Rental } from "../../rental/shared/rental.model";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "car-manage-rental",
  templateUrl: "./manage-rental.component.html",
  styleUrls: ["./manage-rental.component.scss"]
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;
  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.rentalService.getUserRental().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      () => {}
    );
  }
  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.rentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (errorRensponse: HttpErrorResponse) => {
        this.toastr.error(errorRensponse.error.errors[0].detail, "Failed!");
      }
    );
  }
}
