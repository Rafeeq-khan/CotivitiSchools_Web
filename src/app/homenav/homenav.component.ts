import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { DropdownService } from 'src/services/dropdown-servie.service'
import { AuthserviceService } from 'src/services/authservice.service';
import { storageSessions } from 'src/sessions/session.storage';
@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css'],
})
export class HomenavComponent implements OnInit {
  isLoggedIn: boolean = false;
  presentUser: string = '';
  inEditorMode: boolean = false;


  constructor(private Service: AuthserviceService, private router:Router, private storage:storageSessions) {}

  ngOnInit(): void {
      this.storage.currentUser.subscribe((info)=>{
        sessionStorage.setItem("currentUserFirstname",info.firstName);
        sessionStorage.setItem("currentUsesrLastName",info.lastName);
        sessionStorage.setItem("currentUesrID", info.userId);
        sessionStorage.setItem("currentUserRoleId", info.roleId);
      })


      this.storage.sessionStart.subscribe(session =>{
        if(sessionStorage.getItem("currentUserFirstname") ){
          var sessionUser = sessionStorage.getItem("currentUserFirstname") ;
          this.isLoggedIn = true;
          this.presentUser = sessionUser ? sessionUser : "r";
          console.log(this.presentUser);
          console.log(session);
        }

      })
  }
  setMenu(menu:string){
    sessionStorage.setItem("menu",menu);
  }




  logout() {
    this.storage.removeToken();

    this.isLoggedIn = false;
    this.router.navigateByUrl("");
    //this.storage.currentUser.
  };

  }



/*if(userInfo != null){
      alert(userInfo);
    } else{
      alert(userInfo);
    }*/
//console.log(this.Service.loginResponse);

//console.log("values is",this.cateogoryId);
/*this.dropdownService.categoriesApi().subscribe(list =>
      {
        console.log(list);
        this.dropDownList=list;
      },(err)=> console.log(err)
      );*/
