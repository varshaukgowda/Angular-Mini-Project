import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
// FormBuilder, FormGroup, Validators: These are from Angular’s reactive forms module
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss'],
})

export class MemberRegistrationComponent implements OnInit {
  fields: any[] = []; 
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private sharedData: SharedDataService) {
    this.registrationForm = this.fb.group({});
  }

  ngOnInit() {
    this.fields = this.sharedData.getFields();
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
            validators.push(Validators.pattern(/^[A-Za-z\s]+$/)); // Only letters and spaces
            validators.push(this.noOnlySpacesValidator()); // Custom validator for no-only-spaces
            break;
          case 'mobile':
            validators.push(Validators.pattern(/^\d{10}$/)); // Exactly 10 digits
            break;
          case 'email':
            validators.push(Validators.email); // Standard email validation
            validators.push(this.noCapitalLetterAtStartValidator()); // Custom validator for no capital letter at start
            break;
          // case 'address':
          //   validators.push(Validators.pattern(/^[A-Za-z0-9\s\-\/.,#]+$/)); // Letters, numbers, spaces, and special characters
          //   break;
        }

        this.registrationForm.addControl(field.name, this.fb.control('', validators));
      }
    });

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

      return null; // No error
    };
  }

  private noCapitalLetterAtStartValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.length > 0 && /^[A-Z]/.test(value)) {
        return { capitalLetterAtStart: true }; // Return error if the email starts with a capital letter
      }
      return null; // No error
    };
  }

  private noOnlySpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.trim().length === 0) {
        return { onlySpaces: true }; 
      }
      return null; // No error
    };
  }

  onSubmit() {
    this.markFormGroupTouched(this.registrationForm);

    if (this.registrationForm.invalid) {
      if (this.registrationForm.errors?.['atLeastOneFieldRequired']) {
        alert('Fill out the form.'); // Show error if no field is filled
      } else {
        const nameControl = this.registrationForm.get('Name');
        const emailControl = this.registrationForm.get('Email');

        if (nameControl?.errors?.['onlySpaces']) {
          // alert('Only spaces are not allowed in the Name field.');
        } else if (emailControl?.errors?.['capitalLetterAtStart']) {
          // alert('Email should not start with a capital letter.');
        } 
        else {
          alert('Please fill out all required fields correctly.'); // Show error for required fields
        }
      }
      return;
    }

    console.log('Form Submitted', this.registrationForm.value);
    alert('Form submitted successfully!');
    this.registrationForm.reset();
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