import { Component, OnInit } from '@angular/core';
import { Ifavorite } from '../../Models/ifavorite';
import { Favoriteservice } from '../../Services/favoriteservice';
import { ProductService } from '../../Services/product-service';
import { Iproduct } from '../../Models/iproduct';
import { forkJoin } from 'rxjs';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-favorits',
  imports: [ProductCard],
  templateUrl: './favorits.html',
  styleUrl: './favorits.scss',
})
export class Favorits implements OnInit {
  favorites: Ifavorite[] = [];
  favoriteProducts: Iproduct[] = [];
  userId: number = 1;
  constructor(private favService: Favoriteservice, private productService: ProductService) {}
  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favService.getUserFavoriteProducts(this.userId).subscribe({
      next: (data) => {
        this.favorites = data;
        console.log(this.favorites);

        const productRequests = data.map((fav) => this.productService.getProdById(fav.productId));

        forkJoin(productRequests).subscribe((products) => {
          this.favoriteProducts = products;
          console.log('Favorite Products:', this.favoriteProducts);
        });
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
      },
    });
  }
}
