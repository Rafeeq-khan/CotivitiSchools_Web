import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { Iuser } from 'src/app/models/user';
import { Iresponse } from 'src/app/models/responseType';
import {JwtHelperService} from '@auth0/angular-jwt'
import {storageSessions} from 'src/sessions/session.storage';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  accessToken:BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();


  constructor(private http: HttpClient, private storage:storageSessions) {}

  validateUser(user: Iuser) {
    return this.http.post<Iuser>(
      'https://localhost:44317/api/Login/validate',
      user
    );
  }
  authenticateUser(userCredentials: Iuser) {
    return this.http.post(
      'https://localhost:44317/api/Login/authenticate',
      userCredentials,
      { responseType: 'text' }
    ).subscribe((res) => {
      console.log(res);
      this.setToken(res);
    });
  }
  setToken(token: string) {
    this.storage.storeData(token);
    localStorage.setItem('access_token', token);
  }

}
