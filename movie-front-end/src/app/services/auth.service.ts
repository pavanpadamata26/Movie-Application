import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

      login() {
        this.loggedIn.next(true);
      }
      get isLoggedInValue() {
        return this.loggedIn.value;
      }

      logout() {
      
        localStorage.removeItem('jwtToken');
      
        // Notify subscribers about the logout
        this.loggedIn.next(false);
      }
}

  


