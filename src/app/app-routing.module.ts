import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { FormConfigurationComponent } from './form-configuration/form-configuration.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'member-registration', component: MemberRegistrationComponent },
  { path: 'form-configuration', component: FormConfigurationComponent },
  { path: '', redirectTo: '/member-registration', pathMatch: 'full' } ,
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'login',component:LoginComponent},
  { path: 'home',component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }