import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CamelizePipe } from "ngx-pipes";
import { of } from "rxjs";

@Injectable()
export class MapService {
  private geoCoder;
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) {}

  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }
  // location save in cache
  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }
  //use cache location if cached is present for item
  private isLocationCached(location): boolean {
    return this.locationCache[this.camelize(location)];
  }
  //create new location if isnt there
  private geocodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }
    //set new location to item or cache
    return new Observable(observer => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const geometry = result[0].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        } else {
          //error if not valid coordinates
          observer.error("Location could not be geocoded");
        }
      });
    });
  }
  //get location of item or cached
  public getGeoLocation(location: string): Observable<any> {
    if (this.isLocationCached(location)) {
      return of(this.locationCache[this.camelize(location)]);
    } else {
      return this.geocodeLocation(location);
    }
  }
}
