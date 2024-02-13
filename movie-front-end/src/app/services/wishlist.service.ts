import { Injectable } from '@angular/core';
import { WishList } from '../models/wishlist';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishListUrl:string= "http://localhost:port/wishlist"
  addToWishList(wishList: WishList) {
    return this.http.put<WishList>(`${this.wishListUrl}/${wishList.userId}`,wishList);
  }
  getWishList(id: string)//id shud be of useremail// 
  {
    return this.http.get<WishList>(`${this.wishListUrl}/${id}`);
  }
  createDefaultWishList(email:string){
    const emptyList:WishList={userId:email,movies:[]};
    return this.http.post<WishList>(`${this.wishListUrl}`,emptyList);
  }

  constructor(private http:HttpClient) { }
}
