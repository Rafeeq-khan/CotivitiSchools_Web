
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class storageSessions{

  jwtHelperService = new JwtHelperService();
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  sessionStart: BehaviorSubject<any> = new BehaviorSubject(false);
  editorModeOn: BehaviorSubject<any> = new BehaviorSubject(false);
  editorModeSubskills: BehaviorSubject<any> = new BehaviorSubject(false);
  name:BehaviorSubject<string> = new BehaviorSubject("");
  selected:boolean=false;
  constructor(){}
  storeData(token:string){
    var userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;

    var data = userInfo ? {
      userId : userInfo.userId,
      firstName:userInfo.firstName,
      lastName:userInfo.lasttName,
      message: userInfo.message,
      roleId : userInfo.roleId
    } : null;
    console.log("storeData => ",data);
    this.loadCurrentUser(data);
  }

  loadCurrentUser(data:any){
    //data !=null ? sessionStorage.setItem("userPresence",(data.)) :null;
    sessionStorage.setItem("userInfo",JSON.stringify(data?.firstName));
    this.currentUser.next(data);
    this.sessionStart.next(true);
  }
  IsLoggedIn():boolean{
   return sessionStorage.getItem("userInfo") ? true : false;
  }

  removeToken() {

    sessionStorage.removeItem("userInfo");
    sessionStorage.clear();
    sessionStorage.removeItem("currentUser");
  }

  enableEditor() {
    this.editorModeOn.next(true);
  }

  enableEdit4Subskills(){
    this.editorModeSubskills.next(true);
  }

  skillSelect(skillname:string){
    sessionStorage.setItem("selected",skillname);
    var selected= sessionStorage.getItem("selected") ? sessionStorage.getItem("selected"): ""
    if(selected){
      this.name.next(selected);
      this.selected=true;
      alert("session called ");
    }
  }
}

