import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/services/authservice.service';
import { Iuser } from 'src/app/models/user';
import { Router } from '@angular/router';
import { storageSessions } from 'src/sessions/session.storage';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //emailPattern=new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

  //passwordPattern=new RegExp(/(?=.*[0-9])(?=.*[!@$#%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}/);

  //validator=false;

  loginResponse: any;

  constructor(
    private authService: AuthserviceService,
    private storage: storageSessions,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
    ]),
  });

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      var newUser: Iuser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      } as Iuser;
      console.log(newUser);

      this.authService.authenticateUser(newUser);


      this.storage.currentUser.subscribe((info) => {
        if (info != null) {
          console.log(info);
          if(info.message == "Sucess"){
            this.notify.loginNotification('success');
          this.router.navigateByUrl('/home');
          }

        }
      });
      /*this.authService.validateUser(newUser).subscribe((res) => {
        this.loginResponse = res;
        sessionStorage.setItem('user', this.loginResponse);
        console.log(this.loginResponse);
        if ((this, this.loginResponse.message == 'Success')) {
          sessionStorage.setItem('login', 'true');
          this.router.navigateByUrl('');
        }
      });*/
    }
  }
}
