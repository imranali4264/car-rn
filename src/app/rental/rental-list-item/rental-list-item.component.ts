import { Component, OnInit, Input } from "@angular/core";
import { Rental } from "../shared/rental.model";

@Component({
  selector: "car-rental-list-item",
  templateUrl: "./rental-list-item.component.html",
  styleUrls: ["./rental-list-item.component.scss"]
})
export class RentalListItemComponent implements OnInit {
  @Input() rental: Rental;

  constructor() {}

  ngOnInit() {}
}
