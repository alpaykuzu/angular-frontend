import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { SignupModel } from '../models/signupModel';
import { Claims } from '../models/claims';
import { Claim } from '../models/claim';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44314/api/auth/';
  userClaims:string[] = [];

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    this.userClaims.length = 0
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  signUp(signupModel:SignupModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",signupModel)
  }
  getClaims(loginModel:LoginModel){
    return this.httpClient.post<typeof Claims>(this.apiUrl+"getclaims",loginModel)
  }


  setUserClaims(claims: string) {
    this.userClaims.push(claims);
  }

  getUserClaims(): string[] {
    return this.userClaims;
  }
}
