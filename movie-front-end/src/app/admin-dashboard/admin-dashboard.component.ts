import { Component, Inject, Input, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MovieaddComponent } from '../movieadd/movieadd.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieEditComponent } from '../movie-edit/movie-edit.component';




@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
users() {
this.route.navigate(['/all-users']);
}
  @Input()
  movie!:Movie;


openEditDialog(data:any) {
  
  console.log(data);
const dialogRef=this._dialogueref.open(MovieEditComponent,{
    width:'700px',
    data
})
// this._dialogueref.afterAllClosed().subscribe({
//   next:(val)=>{
//     if(val){
//       this.g
//     }
//   }
// })



};
movieId!: string ;
showMovieIdColumn = false;

deleteMovie(movieId:string|undefined) {
  if (movieId) {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');

    if (confirmed) {
      this.imageService.deleteMovie(movieId).subscribe(
        () => {
          // this.router.navigate(['/home']);
          alert("Movie Succesfully deleted")
          this.fetchAllMovies();
        },
        (error: any) => {
          alert("uh...oh");
          console.error('Error deleting movie:', error);
        }
      );
    }
  } else {
    console.error('Movie ID is not available.');
  }
}

  constructor(private imageService: ImageService,private fb:FormBuilder,private route:Router,private _dialogueref:MatDialog ) {}
  
  handleMovieAdded(){
    this.fetchAllMovies();
  }
  showMovieAdd: boolean=false;

toggleMovieAdd() {
 this.showMovieAdd= !this.showMovieAdd;
;}

openDialog(){
  const dialogRef=this._dialogueref.open(MovieaddComponent);
  
  dialogRef.afterClosed().subscribe((result: any) => {
      
    if (result) {
     
      console.log('Dialog result:', result);

     
      this.movieList.push(result);
    }
  });
}

  movieList!: any[];
  dataSource:any;
  displayedColumns:string[]=["movieId","movieTitle","releaseYear","genre","movieDescription","movieRating","action"]
  paginatior: any;

 
  ngOnInit(): void {
    this.fetchAllMovies();
  }
fetchAllMovies() {
  this.imageService.getMovies().subscribe(
    (response: any[]) => {
      console.log("fetching worked", response);
      if (response) {
        this.movieList = response;
        console.log("all movie component")
        console.log(this.movieList);
        this.dataSource = new MatTableDataSource<Movie>(this.movieList);
        this.dataSource.paginator = this.paginatior;
        console.log("Displayed Columns:", this.displayedColumns);
        // this.route.navigate(['/all-users'])
      } else {
        console.log("API response is null or undefined");
      }
    },
    (error: any) => {
      console.log("error while fetching the data", error);
    }
  );
}


}
