import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
     private router: Router,
     private toastr:ToastrService

  ) {
    this.loginForm = this.fb.group({
      emailOrMobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const enteredEmailOrMobile = this.loginForm.get('emailOrMobile')?.value;
    const enteredPassword = this.loginForm.get('password')?.value;

    const storedEmailOrMobile = sessionStorage.getItem('authUser');
    const encryptedPassword = sessionStorage.getItem('encryptedPassword');
    const secretKey = 'mySecretKey123!';

    if (!storedEmailOrMobile || !encryptedPassword  ) 
      {
      // alert('No account found. Please set a password first.');
      this.toastr.error('No account found. Please set a password first.', 'Error');

      return;
    }

    // Decrypt the stored password
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Check if entered credentials match stored credentials
    if (enteredEmailOrMobile === storedEmailOrMobile && enteredPassword === decryptedPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');  // Store login status
      // sessionStorage.setItem('loggedInUser', storedUserName);
      // alert('Login successful!');
      this.toastr.success('Login successful!', 'Success');

      this.router.navigate(['/home']);

    } else {
      // alert('Invalid credentials. Please try again.');
      // this.toast.error({ detail: "Error", summary: "Invalid credentials. Please try again.", duration: 3000 });
      this.toastr.error('Invalid credentials. Please try again.', 'Error');


    }
  }
}