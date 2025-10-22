import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, BehaviorSubject, tap } from 'rxjs';
import { ICart, ICartItem } from '../Models/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';
  private userId = 1;

  private cartSubject = new BehaviorSubject<ICart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserCart(): Observable<ICart> {
    return this.http.get<ICart[]>(`${this.baseUrl}?userId=${this.userId}`).pipe(
      map((carts) => carts[0]),
      tap((cart) => this.cartSubject.next(cart || null))
    );
  }

  addToCart(
    product: { id: number; price: number },
    color: string,
    size: string,
    quantity: number
  ): Observable<ICart> {
    return this.getUserCart().pipe(
      switchMap((cart) => {
        if (!cart) {
          const newCart: ICart = {
            userId: this.userId,
            items: [
              {
                productId: product.id,
                quantity,
                unitPrice: product.price,
                color,
                size,
              },
            ],
            total: product.price * quantity,
          };
          return this.http
            .post<ICart>(this.baseUrl, newCart)
            .pipe(tap((createdCart) => this.cartSubject.next(createdCart)));
        }

        const existingItem = cart.items.find(
          (i) => i.productId === product.id && i.color === color && i.size === size
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          const newItem: ICartItem = {
            productId: product.id,
            quantity,
            unitPrice: product.price,
            color,
            size,
          };
          cart.items.push(newItem);
        }

        cart.total = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

        // return this.http.put<ICart>(`${this.baseUrl}/${cart.id}`, cart);
        return this.http
          .put<ICart>(`${this.baseUrl}/${cart.id}`, cart)
          .pipe(tap((updatedCart) => this.cartSubject.next(updatedCart)));
      })
    );
  }

  updateQuantity(
    cartId: number,
    productId: number,
    color: string,
    size: string,
    newQuantity: number
  ): Observable<ICart> {
    return this.http.get<ICart>(`${this.baseUrl}/${cartId}`).pipe(
      switchMap((cart) => {
        const item = cart.items.find(
          (i) => i.productId === productId && i.color === color && i.size === size
        );

        if (item) {
          item.quantity = newQuantity;
          cart.total = cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        }

        // return this.http.put<ICart>(`${this.baseUrl}/${cartId}`, cart);
        return this.http
          .put<ICart>(`${this.baseUrl}/${cartId}`, cart)
          .pipe(tap((updatedCart) => this.cartSubject.next(updatedCart)));
      })
    );
  }

  removeItem(
    cartId: number,
    productId: number,
    color: string,
    size: string
  ): Observable<ICart | null> {
    return this.http.get<ICart>(`${this.baseUrl}/${cartId}`).pipe(
      switchMap((cart) => {
        cart.items = cart.items.filter(
          (i) => !(i.productId === productId && i.color === color && i.size === size)
        );

        cart.total = cart.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
        if (cart.items.length === 0) {
          return this.http.delete(`${this.baseUrl}/${cartId}`).pipe(
            map(() => null),
            tap(() => this.cartSubject.next(null))
          );
        }
        // return this.http.put<ICart>(`${this.baseUrl}/${cartId}`, cart);
        return this.http
          .put<ICart>(`${this.baseUrl}/${cartId}`, cart)
          .pipe(tap((updatedCart) => this.cartSubject.next(updatedCart)));
      })
    );
  }
}
