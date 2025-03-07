import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // For form handling
import { AppRoutingModule } from './app-routing.module'; // Routing module
import { AppComponent } from './app.component';
import { FormConfigurationComponent } from './form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { SharedDataService } from './shared/shared-data.service';
// import { GridModule } from '@progress/kendo-angular-grid';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';




 // Shared service


@NgModule({
  declarations: [
    AppComponent,
    FormConfigurationComponent,
    MemberRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Enable reactive forms
    AppRoutingModule,  InputsModule, ButtonsModule,
     // Enable routing
  ],
  providers: [SharedDataService], // Provide the shared service
  bootstrap: [AppComponent]
})
export class AppModule { }