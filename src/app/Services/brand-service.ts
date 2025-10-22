import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibrand } from '../Models/ibrand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private httpclient: HttpClient) {}
  url: string = 'http://localhost:3000';

  // ==========get-All-Brands================
  getAllBrands(): Observable<Ibrand[]> {
    return this.httpclient.get<Ibrand[]>(`${this.url}/brands`);
  }
  // ==========get-Brand-By-ID================
  getBrandById(brandID: string): Observable<Ibrand> {
    return this.httpclient.get<Ibrand>(`${this.url}/brands/${brandID}`);
  }
  // ==========add-Brand================
  addBrand(brand: Ibrand): Observable<Ibrand> {
    return this.httpclient.post<Ibrand>(`${this.url}/brands`, JSON.stringify(brand));
  }
  // ==========Delete-Brand=============
  deleteBrand(id: string): Observable<Ibrand> {
    return this.httpclient.delete<Ibrand>(`${this.url}/brands/${id}`);
  }
  // ==========edit-Brand===============
  updateBrand(id: string, brand: Ibrand): Observable<Ibrand> {
    return this.httpclient.patch<Ibrand>(`${this.url}/brands/${id}`, JSON.stringify(brand));
  }
}
