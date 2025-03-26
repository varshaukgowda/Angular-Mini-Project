import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
// FormBuilder, FormGroup, Validators: These are from Angular’s reactive forms module
import { SharedDataService } from '../shared/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss'],
})

export class MemberRegistrationComponent implements OnInit {
  fields: any[] = []; 
  registrationForm: FormGroup;

  constructor(
    private router:Router,
     private fb: FormBuilder,
     private sharedData: SharedDataService
     
  ) {
    this.registrationForm = this.fb.group({});
  }

  ngOnInit() {
    this.fields = this.sharedData.getFields();
    console.log("Fields received from sharedData:", this.fields);
    this.buildForm(); 
  }

  buildForm() {
    this.registrationForm = this.fb.group({});

    this.fields.forEach((field) => {
      if (field.show) {
        let validators = [];

        if (field.required) {
          validators.push(Validators.required);
        }

        switch (field.name.toLowerCase()) {
          case 'name':
            validators.push(Validators.pattern(/^[A-Za-z\s]+$/)); 
            validators.push(this.noOnlySpacesValidator()); // Custom validator for no-only-spaces
            break;
          case 'mobile':
            
            validators.push(Validators.pattern(/^\d{10}$/)); 
            break;
          case 'email':
            validators.push(Validators.email); 
            validators.push(this.noCapitalLetterAtStartValidator()); // Custom validator for no capital letter at start
            break;
          // case 'address':
          //   validators.push(Validators.pattern(/^[A-Za-z0-9\s\-\/.,#]+$/)); // Letters, numbers, spaces, and special characters
          //   break;
        }

        this.registrationForm.addControl(field.name, this.fb.control('', validators));
      }
    });
    console.log("Form Controls after buildForm():", this.registrationForm.controls); // Debugging


    this.registrationForm.setValidators(this.atLeastOneFieldValidator());
  }

  private atLeastOneFieldValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!(control instanceof FormGroup)) {
        return null; 
            }

      const controls = control.controls;
      const isAtLeastOneFieldFilled = Object.keys(controls).some((key) => {
        const control = controls[key];
        return control.value && control.value.trim() !== '';
      });

      if (!isAtLeastOneFieldFilled) {
        return { atLeastOneFieldRequired: true };
      }

      return null; 
    };
  }

  private noCapitalLetterAtStartValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.length > 0 && /^[A-Z]/.test(value)) {
        return { capitalLetterAtStart: true }; 
      }
      return null; 
    };
  }

  private noOnlySpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.trim().length === 0) {
        return { onlySpaces: true }; 
      }
      return null; 
    };
  }

  
  onSubmit() {
    // console.log("Form submission triggered!");

    this.markFormGroupTouched(this.registrationForm);
    // console.log("form value",this.registrationForm.value);

    if (this.registrationForm.invalid) {
      // console.log("Form is invalid."); 

      if (this.registrationForm.errors?.['atLeastOneFieldRequired']) {
        alert('Fill out the form.');
      } else 
      
      {
        const nameControl = this.registrationForm.get('name');
        // console.log("name",nameControl);
        const emailControl = this.registrationForm.get('email');


        if (nameControl?.errors?.['onlySpaces']) {
          alert('Only spaces are not allowed in the Name field.');
        } else if (emailControl?.errors?.['capitalLetterAtStart']) {
          alert('Email should not start with a capital letter.');
        } else {
          alert('Please fill out all required fields correctly.');
        }
      }
      return;
    }

    
  const username=this.registrationForm.get('name')?.value;  
  const mobile = this.registrationForm.get('Mobile')?.value;
  // const mobile = this.registrationForm.get('Mobile')?.value || this.registrationForm.get('mobile')?.value;
  console.log("Mobile value:", mobile);

  if (username) {
    sessionStorage.setItem('username', username);
  }
  if (mobile) {
    sessionStorage.setItem('userMobile', mobile);
    // console.log("Stored userMobile:", sessionStorage.getItem('userMobile'));
  }

  console.log('Form Submitted', this.registrationForm.value);
  alert('Form submitted successfully!');
  this.router.navigate(['/set-password']); 
  
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}