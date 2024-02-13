import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from '../models/movie';
import { Genre } from '../models/genre';
import { error } from 'console';

@Component({
  selector: 'app-movie-listing-page',
  templateUrl: './movie-listing-page.component.html',
  styleUrl: './movie-listing-page.component.css'
})
export class MovieListingPageComponent implements OnInit{


  movies: Movie[]=[];
genres: Genre[]=[];
selectedGenres: Set<string>=new Set<string>();
  constructor(private imageService:ImageService,private snackBar:MatSnackBar){}
ngOnInit(): void {
  
  this.fetchAllMovies();
  this.getAllGenres();
}
//have to write this method in backend and in services
  getAllGenres() {
  //  this.imageService.getAllGenres().subscribe({
  //   next:(data: Genre[])=>{
  //     this.genres=data;
  //     this.genres.forEach((genre)=>
  //     this.selectedGenres.add(genre.id)
  //     );
  //   },
  //   error:(error: any)=>{
  //     console.log(error);
  //   }
    
  //  })
  }

  fetchAllMovies() {
    this.imageService.getMovies().subscribe(
      (success => {
        this.movies=success;
        console.log(success);
      }),
      error =>{
        console.log(error);
      }
    )
  }
  onSearch(searchText: string) {
    if(searchText){
      this.movies=this.movies.filter((movie)=>
      movie.movieTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    else{
      this.fetchAllMovies();
    }
    }
    filterByGenre($event: Set<string>) {
    //  this.movies=this.fetchAllMovies.filter((movie)=>
    //  this.selectedGenres.has(movie.genre));
      }


}
