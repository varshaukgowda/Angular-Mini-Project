import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
    // Load fields from the shared service
    this.fields = this.sharedData.getFields();
    this.buildForm(); // Build the form with the loaded fields
  }

  // Method to build or rebuild the form
  buildForm() {
    // Clear the form
    this.registrationForm = this.fb.group({});

    // Add controls for each field
    this.fields.forEach((field) => {
      if (field.show) {
        let validators = [];

        // Add required validator if the field is marked as required
        if (field.required) {
          validators.push(Validators.required);
        }

        // Add specific validators based on field type
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

        // Add the control to the form with the validators
        this.registrationForm.addControl(field.name, this.fb.control('', validators));
      }
    });

    // Add a global validator to check if at least one field has a value
    this.registrationForm.setValidators(this.atLeastOneFieldValidator());
  }

  // Custom validator to check if at least one field has a value
  private atLeastOneFieldValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!(control instanceof FormGroup)) {
        return null; // Return null if the control is not a FormGroup
      }

      const controls = control.controls;
      const isAtLeastOneFieldFilled = Object.keys(controls).some((key) => {
        const control = controls[key];
        return control.value && control.value.trim() !== '';
      });

      // If no field is filled, return an error
      if (!isAtLeastOneFieldFilled) {
        return { atLeastOneFieldRequired: true };
      }

      return null; // No error
    };
  }

  // Custom validator to ensure the email does not start with a capital letter
  private noCapitalLetterAtStartValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.length > 0 && /^[A-Z]/.test(value)) {
        return { capitalLetterAtStart: true }; // Return error if the email starts with a capital letter
      }
      return null; // No error
    };
  }

  // Custom validator to ensure the name does not contain only spaces
  private noOnlySpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (value && value.trim().length === 0) {
        return { onlySpaces: true }; // Return error if the name contains only spaces
      }
      return null; // No error
    };
  }

  onSubmit() {
    // Mark all fields as touched to trigger validation messages
    this.markFormGroupTouched(this.registrationForm);

    if (this.registrationForm.invalid) {
      if (this.registrationForm.errors?.['atLeastOneFieldRequired']) {
        alert('Fill out the form.'); // Show error if no field is filled
      } else {
        // Check for custom validation errors
        const nameControl = this.registrationForm.get('Name');
        const emailControl = this.registrationForm.get('Email');

        if (nameControl?.errors?.['onlySpaces']) {
          alert('Only spaces are not allowed in the Name field.');
        } else if (emailControl?.errors?.['capitalLetterAtStart']) {
          alert('Email should not start with a capital letter.');
        } else {
          alert('Please fill out all required fields correctly.'); // Show error for required fields
        }
      }
      return;
    }

    // If the form is valid, submit it
    console.log('Form Submitted', this.registrationForm.value);
    alert('Form submitted successfully!');
    this.registrationForm.reset();
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}