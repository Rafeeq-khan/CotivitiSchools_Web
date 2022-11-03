import { Injectable } from '@angular/core';
import{ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr:ToastrService) { }

    regNotification(status:string){
      this.toastr.success("Registration Success");
    }

    loginNotification(respose:string){

      this.toastr.success("Login success");
    }
}
