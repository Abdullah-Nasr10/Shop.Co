import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ifavorite } from '../Models/ifavorite';

@Injectable({
  providedIn: 'root',
})
export class Favoriteservice {
  url: string = 'http://localhost:3000';
  constructor(private httpclient: HttpClient) {}

  // ==========Get all favorites for a user===============
  getUserFavorites(userId: number): Observable<Ifavorite[]> {
    return this.httpclient.get<Ifavorite[]>(`${this.url}/favorites?userId=${userId}`);
  }

  // ==========Add new favorite===================
  addToFavorites(userId: number, productId: number): Observable<Ifavorite> {
    return this.httpclient.post<Ifavorite>(`${this.url}/favorites`, { userId, productId });
  }

  // ===========Remove favorite by id============
  removeFavorite(favoriteId: number): Observable<Ifavorite> {
    return this.httpclient.delete<Ifavorite>(`${this.url}/favorites/${favoriteId}`);
  }

  // ===========check Favorite============
  checkFavorite(userId: number, productId: number): Observable<Ifavorite[]> {
    return this.httpclient.get<Ifavorite[]>(
      `${this.url}/favorites?userId=${userId}&productId=${productId}`
    );
  }
  // =============get User Favorite Products============
  getUserFavoriteProducts(userId: number): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.url}/favorites?userId=${userId}&_expand=product`);
  }

  // ===========load user favorite================
  isProductFavorite(favorites: any[], productId: number): boolean {
    return favorites.some((fav) => fav.productId == productId);
  }
}
