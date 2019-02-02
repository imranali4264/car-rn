import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgPipesModule } from "ngx-pipes";

import { ManageComponent } from "./manage.component";
import { ManageRentalBookingComponent } from "./manage-rental/manage-rental-booking/manage-rental-booking.component";
import { ManageBookingComponent } from "./manage-booking/manage-booking.component";
import { ManageRentalComponent } from "./manage-rental/manage-rental.component";
import { FormatDatePipe } from "../common/pipes/format-date.pipe";

import { AuthGuard } from "../auth/shared/auth.guard";
import { RentalService } from "../rental/shared/rental.service";
import { BookingService } from "../booking/shared/booking.service";

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    children: [
      {
        path: "rentals",
        component: ManageRentalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":bookings",
        component: ManageBookingComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    ManageBookingComponent,
    ManageRentalComponent,
    FormatDatePipe,
    ManageRentalBookingComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, NgPipesModule],
  providers: [RentalService, BookingService]
})
export class ManageModule {}
