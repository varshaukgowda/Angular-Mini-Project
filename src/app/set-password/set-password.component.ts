import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent {

  passwordForm:FormGroup;   

  constructor(private fb:FormBuilder,private router:Router,
    private toastr:ToastrService

  )
  {
    this.passwordForm=this.fb.group(
      {
      // userName: ['', Validators.required],
      newPassword: ['',
      [
        Validators.required,      
        Validators.minLength(10),
        Validators.maxLength(15), 
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
      ]
    ],

      confirmPassword:['',Validators.required]
      },
      
        { validator: this.passwordMatchValidator });
      }

      passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return newPassword === confirmPassword ? null : { mismatch: true }; 
      }

    onSubmit(){
      if(this.passwordForm.invalid){
        return
      }
      // const userName = this.passwordForm.get('userName')?.value; 
      const password=this.passwordForm.get('newPassword')?.value;
      const emailOrMobile =sessionStorage.getItem('userMobile' ) || sessionStorage.getItem('useremail');
      if (!emailOrMobile) {
        // alert('No email or mobile number found. Please register first.');
        return;
      }
      const secretKey = 'mySecretKey123!'; 
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

      // sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('encryptedPassword', encryptedPassword);
      sessionStorage.setItem('authUser', emailOrMobile); 



      // alert('password successfully set !');
      this.toastr.success('password successfully set !', 'Success');

      this.router.navigate(['/login']);
    }
  }
  

