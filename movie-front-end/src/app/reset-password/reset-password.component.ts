import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submitResetPassword(): void {
    // Handle the logic for resetting the password
    if (this.resetPasswordForm.valid && !this.passwordsNotMatch()) {
      const email = this.resetPasswordForm.get('email')?.value;
      const password = this.resetPasswordForm.get('password')?.value;

      // Add your password reset logic here
      console.log('Email:', email);
      console.log('Password:', password);

      // You can send the request to your server to perform the password reset
    } else {
      console.log('Form is invalid or passwords do not match');
    }
  }

  passwordsNotMatch(): boolean {
    const password = this.resetPasswordForm.get('password')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }
}
