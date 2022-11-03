import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userName:any;
  userID:any;

  constructor() { }

  ngOnInit(): void {
    this.userName= sessionStorage.getItem("currentUserFirstname");
    this.userID = sessionStorage.getItem("currentUesrID");
  }

}
