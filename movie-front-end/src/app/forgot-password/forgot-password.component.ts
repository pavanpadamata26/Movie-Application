import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }
 
  buildForm(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  resetPassword(): void {
    // if (this.forgotPasswordForm.valid) {
    //   // Implement your password reset logic here
    //   const email = this.forgotPasswordForm.get('email').value;
    //   console.log(`Reset password for email: ${email}`);
    // }
  }
}
