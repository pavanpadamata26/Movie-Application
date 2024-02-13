import { Component, Inject, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {

onFileChange(event: any) {
  if (event?.target?.files && event.target.files.length > 0) {
    this.file = event.target.files[0];
  } else {
    this.file = null;
  }
}
movieForm!: FormGroup;
  file: File | null = null;
  movie: Movie = {
    movieId: '',
    movieTitle: '',
    releaseYear: '',
    genre: '',
    movieDescription: '',
    movieRating: '',
  };

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private _route: ActivatedRoute,
    private _dialogref: MatDialogRef<AdminDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.movieId) {
      const movieId = this.data.movieId;
      this.imageService.getMovieById(movieId.toString()).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          this.initForm();
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching movie:', error);
        }
      );
    }
  }

  initForm(): void {
    this.movieForm = this.fb.group({
      movieTitle: ['', Validators.required],
      releaseYear: ['', Validators.required],
      genre: [''],
      movieDescription: [''],
      movieRating: [''],
    });
  }

  populateForm(): void {
    this.movieForm.patchValue({
      movieTitle: this.movie.movieTitle,
      releaseYear: this.movie.releaseYear,
      genre: this.movie.genre,
      movieDescription: this.movie.movieDescription,
      movieRating: this.movie.movieRating,
    });
  }

  editMovie() {
    this.imageService.modifyMovie(this.movie, this.file).subscribe(
      (modifyData) => {
        console.log(modifyData);
        alert('Movie updated successfully!');
        this._dialogref.close();
      },
      (error) => {
        alert('Error updating movie. Please try again.');
        console.error(error);
      }
    );
  }
}