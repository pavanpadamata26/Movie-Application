import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieaddComponent } from './movieadd/movieadd.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ImageComponent } from './image/image.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDescriptionPageComponent } from './movie-description-page/movie-description-page.component';
import { MovieListingPageComponent } from './movie-listing-page/movie-listing-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistGuard} from './auth/wishlist.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  
  {path:'',component:MovieListingPageComponent},
   { path: 'home',component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'verify',component:VerifyComponent},
  {path:'movie-edit',component:MovieEditComponent},
  {path:'movieadd',component:MovieaddComponent},
  {path:'all-users',component:AllUsersComponent},
  {path:'image',component:ImageComponent},
  {path:'movie-card',component:MovieCardComponent},
  {path:'movie-description-page/:id',component:MovieDescriptionPageComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'movie-listing-page',component:MovieListingPageComponent},
  {path:'wishlist',component:WishlistComponent,canActivate:[WishlistGuard]},
  {path:'profile-page',component:ProfilePageComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
