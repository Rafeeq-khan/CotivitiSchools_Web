import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iregister } from 'src/app/models/registerType';
import { ApiService } from 'src/services/api.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

  passwordPattern = new RegExp(
    /(?=.*[0-9])(?=.*[!@$#%^&*])[a-zA-Z0-9!@#$%^&*]/
  );

  namePattern = new RegExp(/^[a-zA-Z]+$/);

  //repasswordPattern : boolean = (password ==repassword) ? true : false;

  constructor(
    private api: ApiService,
    private router: Router,
    private notify:NotificationService
    //private toastr: ToastrService
  ) {}

  ngOnInit(): void {

  }
  register(signup: any) {
    console.log(signup.value);
    console.log(signup);
    //console.log(signup.value.email,signup.firstname,signup.lastname,signup.password);
    this.api
      .registerUser(
        signup.value.email,
        signup.value.firstname,
        signup.value.lastname,
        signup.value.password
      )
      .subscribe(
        (res) => {
          console.log(res);
          if (res.toString() == 'Success') {
            alert('Registration Successfull');
            this.notify.regNotification(res.toString());
          //  this.toastr.success('Registration Successfull');
            this.router.navigateByUrl('/login');
          } else {
           // this.toastr.error('Error');
          }
        },
        (error) => {
          console.log(error);
          console.log('error');
        }
      );
  }
}
