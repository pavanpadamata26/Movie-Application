import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from  '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-movieadd',
  templateUrl: './movieadd.component.html',
  styleUrl: './movieadd.component.css'
})
export class MovieaddComponent implements OnInit{
  @Output() movieAdded: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {
    this.movieForm = this.fb.group({
      movieId: [''],
      movieTitle: ['', Validators.required],
      releaseYear: ['', Validators.pattern('^[0-9]{4}$')],
      genre: [''],
      movieImagePath: [''],
      movieDescription: [''],
      movieRating: ['', Validators.pattern('^[0-9](\.[0-9]{1,2})?$')]
    });
  }
  selectedFile!: File;
  name!: string;
  movieForm!: FormGroup;
  movie: any;
  movies:Movie[]=[];

  constructor(private imageService: ImageService,private sanitizer: DomSanitizer,private fb:FormBuilder,private router:Router,private _dailogref:MatDialog) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    const formData=this.movieForm.value;
    this.imageService.addMovie(formData,this.selectedFile).subscribe(
      (response:any)=>{
        console.log("Movie added successfully",response);
        this.onUpload(response.movieId);
        this._dailogref.closeAll();
        alert("Movie added successfully : " + formData.movieTitle);
        this.movieAdded.emit();
      },
      error=>{
        console.error('error adding movie:',error);
        alert("movie not added..uhhhh, but it is getting saved in local folder huhuuu");
      }
    )
    this.imageService.getMovies();
    }
      
    
      onUpload(movieId:string) {
        if (this.name && this.selectedFile) {
          this.imageService.addMovie(this.movieForm.value, this.selectedFile)
            .subscribe(
              response => {
                console.log('Response from server:', response);
                if(typeof response === 'string' && response.includes('Image Uploaded successfully')){
                  console.log('File uploaded successfully:', response);
                  alert("Movie added successfully : " );
                  
                }
                else{
                  console.log('unexcpeced format',response);
                }
                
                
              },
              error => {
                console.error('Error uploading file:', error);
               
              }
            );
        } else {
          console.error('Name and file must be provided.');
        }
      }


}
