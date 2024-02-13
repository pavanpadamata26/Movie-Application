import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginStatus } from '../models/loginstatus';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {
filterByGenre($event: Set<string>) {
throw new Error('Method not implemented.');
}
genres!: Genre[];
selectedGenres!: Set<string>;
  onSearch(query: string) {
    // Handle the search query, e.g., filter carousel items based on the query
    console.log('Search query:', query);
  }
userLogout() {
this.authservice.logout();
}

//loginStatus: LoginStatus = { isLoggedIn: false, id: 'default', role: 'user' };
  
 constructor(public authservice:AuthService){}
// userLogout() {
//   this.loginStatus.isLoggedIn = false;
//   this.userLoginService.putLoginStatus(this.loginStatus).subscribe({
//     next: (data) => {
//       localStorage.removeItem('loginStatus');
//       window.location.reload();
//     },
//     error: (err) => {
//       console.log(err);
//     },
//   });
// }
// getCartLength(email: string) {
//   this.cartService.getCart(email).subscribe({
//     next: (data) => {
//       this.cartLength = data.items.length;
//     },
//     error: (err) => {
//       console.log(err);
//     },
//   });
// }
// }
  
}
