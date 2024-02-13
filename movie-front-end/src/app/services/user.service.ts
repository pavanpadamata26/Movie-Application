import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, map, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userUrl2 + "/allUsers").pipe(
      map((response: any[]) => {
        console.log("Response coming from user service", response);
        return response; // Return the response data
      }),
      catchError((error) => {
        console.log("Error while getting the data", error);
        throw error;
      })
    );
  }


  constructor(private http:HttpClient) { }
  userUrl="http://localhost:4444/auth-app";
  userUrl2="http://localhost:4444/user"
    loginUser(loginData:any){
      console.log("reached service");
      console.log(loginData);
      return this.http.post(this.userUrl+"/loginCheck",loginData);
    }
   signupUser(signupdata:any):Observable<any>{
    return this.http.post(this.userUrl2+"/addUser1",signupdata)
    .pipe(
      catchError((error)=>{
        console.log("error while signup",error)
        throw error
      })
    )

   } 
  //  verifyUser(verifyData:any):Observable<any>{
  //   return this.http.post(this.userUrl2+"/verifyUser",verifyData)
  //   .pipe(
  //     catchError((error)=>{
  //       console.log("error while verifying",error)
  //       throw error
  //     })
  //   )
  //  }
  // verifyUser(verifyData: any): Observable<any> {
  //   return this.http.post(this.userUrl2 + '/verifyUser', verifyData).pipe(
     
  //     map((response: any) => {
  //       console.log(response);
  //       if (response && response.success) {
  //         return response; // Successful response
  //       } else {
  //         throw new Error('Invalid verification code or user not found.');
  //       }
  //     }),
  //     catchError((error) => {
  //       console.log('Error while verifying', error);
  //       return throwError(error); // Rethrow the error
  //     })
  //   );
  // verifyUser(verifyData: any): Observable<any> {
  //   return this.http.post(this.userUrl2 + '/verifyUser', verifyData).pipe(
  //     map((response: any) => {
  //       console.log('Response from server:', response);
  //       if (response && response.status === 'OK') {
  //         return response; // Successful response
  //       } else {
  //         throw new Error(response.body || 'Invalid verification code or user not found.');
  //       }
  //     }),
  //     catchError((error) => {
  //       console.log('Error while verifying', error);
  //       return throwError(error); // Rethrow the error
  //     })
  //   );
  // }
  verifyUser(verifyData: any): Observable<any> {
    return this.http.post(this.userUrl2 + '/verifyUser', verifyData).pipe(
      map((response: any) => {
        console.log('Response from server:', response);
        if (response && response.statusCode === 'OK') {
          return response.body; // Successful response
        } else {
          throw new Error(response.body || 'Invalid verification code or user not found.');
        }
      }),
      catchError((error) => {
        console.log('Error while verifying', error);
        return throwError(error); // Rethrow the error
      })
    );
  }
  
  
  
  // verifyUser(verifyData: any): Observable<any> {
  //   // Add a timestamp to the URL to ensure a new request is made each time
  //   const timestamp = new Date().getTime();
  //   const urlWithTimestamp = `${this.userUrl2}/verifyUser?timestamp=${timestamp}`;
  
  //   return this.http.post(urlWithTimestamp, verifyData).pipe(
  //     map((response: any) => {
  //       console.log(verifyData);
  //       if (response && response.success) {
  //         return response; // Successful response
  //       } else {
  //         throw new Error('Invalid verification code or user not found.');
  //       }
  //     }),
  //     catchError((error) => {
  //       console.log('Error while verifying', error);
  //       return throwError(error); // Rethrow the error
  //     })
  //   );
  // }
  
}
