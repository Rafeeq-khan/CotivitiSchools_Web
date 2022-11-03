import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
import { HomeComponent } from './home/home.component';
import { HomenavComponent } from './homenav/homenav.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { SkillcontentComponent } from './skillcontent/skillcontent.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"homenav",component:HomenavComponent},
  {path:"menu/:id",component:MenuComponent},
  {path:"menu",component:MenuComponent},
  {path:"skillcontents/:skillId",component:SkillcontentComponent},
  {path:"content",component:SkillcontentComponent},
  {path:"login", component:LoginComponent},
  {path:"register",component:RegistrationComponent},
  {path:"profile",component:UserprofileComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
