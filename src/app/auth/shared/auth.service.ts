import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";
import "rxjs/Rx";

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = "";
}

@Injectable()
export class AuthService {
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem("car_meta")) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem("car_auth", token);
    localStorage.setItem("car_meta", JSON.stringify(this.decodedToken));
    return token;
  }
  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post("/api/users/register", userData);
  }

  public login(userData: any): Observable<any> {
    return this.http
      .post("/api/users/login", userData)
      .map((token: string) => this.saveToken(token));
  }
  public logout() {
    localStorage.removeItem("car_auth");
    localStorage.removeItem("car_meta");

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }
  public getAuthToken(): string {
    return localStorage.getItem("car_auth");
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }
}
