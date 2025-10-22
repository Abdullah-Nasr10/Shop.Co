import { Component, Input, OnInit } from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Favoriteservice } from '../../Services/favoriteservice';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  @Input() product: Iproduct = {} as Iproduct;
  Math = Math;
  userId = 1;
  isFav: boolean = false;
  favId?: number;
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 1;

  // ---------toaster-message-varibles-----------
  showAddedToast: boolean = false;
  ShowpleaseSelectToast: boolean = false;
  showAddedToFavoritesToast: boolean = false;
  showRemovedFromFavoritesToast: boolean = false;

  // ---------constructor---------------
  constructor(
    private router: Router,
    private favoriteService: Favoriteservice,
    private cartService: CartService
  ) {}

  // --------ngOnInit-------------
  ngOnInit(): void {
    this.favoriteService.getUserFavorites(this.userId).subscribe((favs) => {
      this.isFav = this.favoriteService.isProductFavorite(favs, this.product.id);
      const found = favs.find((f) => f.productId === this.product.id);
      if (found) {
        this.isFav = true;
        this.favId = found.id;
      }
    });
  }
  toggleFavorite() {
    if (this.isFav && this.favId) {
      this.favoriteService.removeFavorite(this.favId).subscribe(() => {
        this.isFav = false;
        this.favId = undefined;
        this.showAddedToFavoritesToast = false;
        this.showRemovedFromFavoritesToast = true;
        setTimeout(() => {
          this.showRemovedFromFavoritesToast = false;
        }, 3000);
      });
    } else {
      this.favoriteService.addToFavorites(this.userId, this.product.id).subscribe((newFav) => {
        this.isFav = true;
        this.favId = newFav.id;
        this.showRemovedFromFavoritesToast = false;
        this.showAddedToFavoritesToast = true;

        setTimeout(() => {
          this.showAddedToFavoritesToast = false;
        }, 3000);
      });
    }
  }

  // -----------goToDetails---------------
  goToDetails(id: number) {
    this.router.navigate([`/Product/${id}`]);
  }

  // ---------handle-cart--------------
  selectColor(color: string) {
    this.selectedColor = color;
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }

  // -----add-to-carr------
  addToCart() {
    if (!this.selectedColor || !this.selectedSize) {
      // alert('Please select color and size before adding to cart');
      this.ShowpleaseSelectToast = false;
      this.ShowpleaseSelectToast = true;
      setTimeout(() => {
        this.ShowpleaseSelectToast = false;
      }, 3000);
      return;
    }

    this.cartService
      .addToCart(this.product, this.selectedColor, this.selectedSize, this.quantity)
      .subscribe(() => {
        // alert('Added to cart successfully!');
        this.showAddedToast = false;
        this.showAddedToast = true;
        setTimeout(() => {
          this.showAddedToast = false;
        }, 3000);
      });
  }
}
