import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomenavComponent } from './homenav/homenav.component';
import { HomeComponent } from './home/home.component'
//import { DropdownService } from 'src/services/dropdown-servie.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/services/api.service';
import { MenuComponent } from './menu/menu.component';
import { SkillcontentComponent } from './skillcontent/skillcontent.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { SafePipe } from './skillcontent/skillcontent.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    HomenavComponent,
    HomeComponent,
    MenuComponent,
    SkillcontentComponent,
    LoginComponent,
    RegistrationComponent,
    SafePipe,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    CKEditorModule,
    ToastrModule.forRoot()

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
//DropdownService
