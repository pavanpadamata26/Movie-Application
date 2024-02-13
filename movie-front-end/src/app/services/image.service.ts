import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, catchError, tap } from 'rxjs';
import { Movie } from '../models/movie';



@Injectable({
  providedIn: 'root'
})
export class ImageService {
  getAllGenres() {
    throw new Error('Method not implemented.');
  }
  
  
private imageUrl="http://localhost:4444/movies"
  handleError: ((err: any, caught: Observable<Movie>) => ObservableInput<any>) | any;
  constructor(private httpClient:HttpClient) { }

addMovie(movieData: any, file: File): Observable<any> {
  const formData :FormData=new FormData();

 
  formData.append('movieTitle',movieData.movieTitle);
  formData.append('releaseYear', movieData.releaseYear);
  formData.append('genre', movieData.genre);
  formData.append('movieDescription', movieData.movieDescription);
  formData.append('movieRating',movieData.movieRating);
  formData.append('file', file, file.name);

  return this.httpClient.post(`${this.imageUrl}/admin/addMovie`, formData);
  
}

getMovies():Observable<Movie[]>{
  return this.httpClient.get<Movie[]>(this.imageUrl+"/all");
}
/*this is for deleting movie*/

deleteMovie(movieId:string):Observable<any>{
  console.log("delete movie service invoked");
  const deleteUrl=`${this.imageUrl}/admin/deleteMovie/${movieId}`;
  return this.httpClient.delete<Movie>(deleteUrl);
}
/*this is for get movie by id*/
getMovieById(movieId: string) :Observable<Movie>{
  console.log("method invoked")
  const url=`${this.imageUrl}/admin/${movieId}`;
  return this.httpClient.get<Movie>(url);
}
/*this is for update movie*/
modifyMovie(movieData:any,file:File|null):Observable<any>{
  console.log("Modify Movie called {}", movieData);
  const formData:FormData=new FormData();
  formData.append('movieId',movieData.movieId);
  formData.append('movieTitle',movieData.movieTitle);
  formData.append('releaseYear',movieData.releaseYear);
  formData.append('genre',movieData.genre);
  formData.append('movieDescription',movieData.movieDescription);
  formData.append('movieRating',movieData.movieRating);
  if(file){
    formData.append('file',file,file.name)  ;
  } 
  console.log("..........."+formData)
  // const headers = new HttpHeaders();
  // headers.set('Content-Type', 'multipart/form-data');
  const url=`${this.imageUrl}/admin/updateMovie`;
  return this.httpClient.post(url,formData);
}
  }


