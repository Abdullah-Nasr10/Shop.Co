import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart-service';
import { ICartItem } from '../../Models/icart';
import { ProductService } from '../../Services/product-service';
import { firstValueFrom, forkJoin } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isNavbarOpen: boolean = false;
  isSearchOpen: boolean = false;
  isCartOpen: boolean = false;
  isUserOpen: boolean = false;
  searchQuery: string = '';
  // ======handle-cart-varibles===========
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;
  orderCount: number = 0;
  // --------constructor--------------
  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  // --------ngOnInit--------------
  ngOnInit(): void {
    this.loadCart();
    // console.log(this.cartItems);
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
    this.isSearchOpen = false;
    this.isCartOpen = false;
    this.isUserOpen = false;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    this.isNavbarOpen = false;
    this.isCartOpen = false;
    this.isUserOpen = false;
  }
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.isNavbarOpen = false;
    this.isSearchOpen = false;
    this.isUserOpen = false;
  }
  toggleUser() {
    this.isUserOpen = !this.isUserOpen;
    this.isNavbarOpen = false;
    this.isSearchOpen = false;
    this.isCartOpen = false;
  }
  // ==================handle-search==================
  // onSearch() {
  //   const query = this.searchQuery.trim();
  //   if (query) {
  //     this.router.navigate(['/Search', query]);
  //     this.searchQuery = '';
  //     this.isSearchOpen = false;
  //   }
  // }
  async onSearch() {
    const query = this.searchQuery.trim();
    if (query) {
      this.router.navigate(['/Search', query]);
      this.searchQuery = '';
      this.isSearchOpen = false;
    }
  }

  // =============handle-cart================
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
          this.orderCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        });
      } else {
        this.cartItems = [];
        this.totalPrice = 0;
        this.orderCount = 0;
      }
    });

    this.cartService.getUserCart().subscribe();
  }
  // ---------increase-Quantity----------
  increaseQuantity(item: ICartItem) {
    const newQuantity = item.quantity + 1;
    this.cartService
      .updateQuantity(item.cartId!, item.productId, item.color, item.size, newQuantity)
      .subscribe();
  }

  // ---------decrease-Quantity----------
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
  goToCheckout() {
    this.isCartOpen = false;
    this.router.navigate(['/Cart']);
  }
}
