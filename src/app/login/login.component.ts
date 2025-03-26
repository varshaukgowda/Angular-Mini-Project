import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

    // Retrieve stored credentials
    const storedEmailOrMobile = sessionStorage.getItem('authUser');
    const encryptedPassword = sessionStorage.getItem('encryptedPassword');
    // const storedUserName= sessionStorage.getItem('userName');
    const secretKey = 'mySecretKey123!';

    if (!storedEmailOrMobile || !encryptedPassword  ) 
      {
      alert('No account found. Please set a password first.');
      return;
    }

    // Decrypt the stored password
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Check if entered credentials match stored credentials
    if (enteredEmailOrMobile === storedEmailOrMobile && enteredPassword === decryptedPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');  // Store login status
      // sessionStorage.setItem('loggedInUser', storedUserName);
      alert('Login successful!');
      this.router.navigate(['/home']);

    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
}