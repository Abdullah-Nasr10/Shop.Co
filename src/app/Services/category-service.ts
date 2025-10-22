import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpclient: HttpClient) {}
  url: string = 'http://localhost:3000';

  // =======get-all-Categrories================
  getAllCategories(): Observable<Icategory[]> {
    return this.httpclient.get<Icategory[]>(`${this.url}/categories`);
  }
  // ==========get-Category-By-ID================
  getCategoryById(catID: string): Observable<Icategory> {
    return this.httpclient.get<Icategory>(`${this.url}/categories/${catID}`);
  }
  // ==========add-Category================
  addCategory(category: Icategory): Observable<Icategory> {
    return this.httpclient.post<Icategory>(`${this.url}/categories`, JSON.stringify(category));
  }
  // ==========Delete-Category=============
  deleteCategory(id: string): Observable<Icategory> {
    return this.httpclient.delete<Icategory>(`${this.url}/categories/${id}`);
  }
  // ==========edit-Category===============
  updateCategory(id: string, category: Icategory): Observable<Icategory> {
    return this.httpclient.patch<Icategory>(
      `${this.url}/categories/${id}`,
      JSON.stringify(category)
    );
  }
}
