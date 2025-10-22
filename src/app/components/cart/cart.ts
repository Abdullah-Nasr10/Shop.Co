import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart-service';
import { ICartItem } from '../../Models/icart';
import { ProductService } from '../../Services/product-service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss'],
})
export class Cart implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.cart$.subscribe((cart) => {
      if (cart) {
        const productIds = cart.items.map((i) => i.productId);
        const productRequests = productIds.map((id) => this.productService.getProdById(String(id)));

        forkJoin(productRequests).subscribe((products) => {
          this.cartItems = cart.items.map((item, index) => ({
            ...item,
            cartId: cart.id,
            productName: products[index].name,
            image: [products[index]?.images?.[0]],
          }));
          this.totalPrice = cart.total;
        });
      } else {
        this.cartItems = [];
        this.totalPrice = 0;
      }
    });

    this.cartService.getUserCart().subscribe();
  }

  increaseQuantity(item: ICartItem) {
    const newQuantity = item.quantity + 1;
    this.cartService
      .updateQuantity(item.cartId!, item.productId, item.color, item.size, newQuantity)
      .subscribe();
  }

  decreaseQuantity(item: ICartItem) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.cartService
        .updateQuantity(item.cartId!, item.productId, item.color, item.size, newQuantity)
        .subscribe();
    }
  }

  removeItem(item: ICartItem) {
    this.cartService.removeItem(item.cartId!, item.productId, item.color, item.size).subscribe();
  }
}
