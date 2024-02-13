import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [
    // Add your animations here
    trigger('bounce', [
      transition('* => *', [
        animate('1000ms ease-in-out', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-5px)', offset: 0.5 }),
          style({ transform: 'translateY(0)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
})
export class SignupComponent {
  signupForm:FormGroup;
  bounceState = 'normal';
  constructor(private fb:FormBuilder,private userservice:UserService,private route:Router){
    this.signupForm=this.fb.group({
      userEmailId:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    },{Validators:this.passwordMatchValidator})
    };
    private passwordMatchValidator(form: FormGroup): null | object {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
  
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  

  signupUser() {
    if (this.signupForm.valid) {
     
      // if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
       
      //   alert("Passwords don't match. Please check and try again.");
      //   return;
      // }

      
      const userId = generateUserId(); 
      const userData = {
        userEmailId: this.signupForm.value.userEmailId,
        password: this.signupForm.value.password,
        userId: userId,
      };

      this.userservice.signupUser(userData).subscribe(
        (response) => {
          alert("plese verify the email")
          console.log('User signed up successfully:', );
          this.route.navigate(['/verify',{ userEmailId: userData.userEmailId }]);
        },
        (error) => {
          
          console.error('Error during signup:', error);
          // You might want to show an error message to the user
        }
      );
    }
  }
  startBounceAnimation() {
    this.bounceState = 'bounce';
  }
  resetBounceAnimation() {
    this.bounceState = 'normal';
  }
}
export function generateUserId(prefix: string = 'user'): string {
  const randomString = Math.random().toString(36).substring(7);
  return `${prefix}-${randomString}`;
}



