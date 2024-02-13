import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImageService } from '../services/image.service';

import { LoginStatus } from '../models/loginstatus';
import { Movie } from '../models/movie';
import { WishList } from '../models/wishlist';
import { error } from 'console';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-movie-description-page',
  templateUrl: './movie-description-page.component.html',
  styleUrl: './movie-description-page.component.css'
})
export class MovieDescriptionPageComponent implements OnInit{
loginStatus: LoginStatus = {isLoggedIn:false, id: '', role: 'user'};

movie: Movie={
  movieImagePath:'',
  movieId:'',
  movieTitle:'',
  movieDescription:'',
  movieRating:'',
  
};
constructor(
  private activatedRoute: ActivatedRoute,private imageService:ImageService,private router:Router,private wishlistservice:WishlistService){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      let id=param.get('id')??'';
      this.imageService.getMovieById(id).subscribe((data: any)=>{
        this.movie=data;
        
      });
    });
  

this.loginStatus=JSON.parse(
  
  localStorage.getItem('loginStatus')?? JSON.stringify({isLoggedIn:false,id:'',role:''})
);

}

addMovieToWishList(){
  const movie:Movie={
    movieId:this.movie.movieId,
    movieTitle:this.movie.movieTitle,
    movieImagePath:this.movie.movieImagePath,
    movieDescription:this.movie.movieDescription,
    movieRating:this.movie.movieRating,
    // movieTrailer
    // movieReviews
    // movieCast

  };

  this.wishlistservice.getWishList(this.loginStatus.id).subscribe({
    next:(data: any)=>{
      let wishList:WishList=data;
      wishList.movies.push(movie);

      this.wishlistservice.addToWishList(wishList).subscribe((response)=>{
        console.log("Movie added to list:" ,response);
        this.router.navigate(['/wishlist']);
      });  
    },
    error:(error: any)=>{
      console.log(error)
    },
  });
}
}
