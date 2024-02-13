import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
// import { MovieService } from '../services/movie.service';
// import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  onSearch(query: string) {
    // Handle the search query, e.g., filter carousel items based on the query
    console.log('Search query:', query);
  }
  movies: Movie[]=[];


  constructor(private imageService:ImageService){}
ngOnInit(): void {
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
@Input()
movie!: Movie
 // faPlayCircle= faPlayCircle;

  // interval = 2000;
  // pauseOnHover = true;
  // pauseOnFocus = true;


  // constructor(public movieService: MovieService, private router: Router) {
  //   this.movieService.getMovies();
  // }

  // handlePlayButton(imdbId: string) {
  //   this.router.navigate(['trailer', imdbId]);
  // }

  // hanldeReviewButton(imdbId: string) {
  //   this.router.navigate(['review', imdbId]);
  // }
}
