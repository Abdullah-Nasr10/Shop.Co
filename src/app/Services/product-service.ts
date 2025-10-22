import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}
  url: string = 'http://localhost:3000';

  // ==========get-All-Products================
  getAllProducts(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(`${this.url}/products`);
  }
  // ==========get-Product-By-ID================
  getProdById(prdID: string): Observable<Iproduct> {
    return this.httpclient.get<Iproduct>(`${this.url}/products/${prdID}`);
  }

  // ==========add-Product================
  addProduct(prod: Iproduct): Observable<Iproduct> {
    return this.httpclient.post<Iproduct>(`${this.url}/products`, JSON.stringify(prod));
  }

  // ==========Delete-Product=============
  deleteProduct(id: string): Observable<Iproduct> {
    return this.httpclient.delete<Iproduct>(`${this.url}/products/${id}`);
  }

  // ==========edit-Product===============
  updateProduct(id: string, prod: Iproduct): Observable<Iproduct> {
    return this.httpclient.patch<Iproduct>(`${this.url}/products/${id}`, JSON.stringify(prod));
  }
}
