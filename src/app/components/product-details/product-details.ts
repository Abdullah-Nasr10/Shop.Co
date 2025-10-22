import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../Models/iproduct';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../Services/brand-service';
import { Ibrand } from '../../Models/ibrand';
import { ProductCard } from '../product-card/product-card';
import { Favoriteservice } from '../../Services/favoriteservice';
import { Ifavorite } from '../../Models/ifavorite';
import { CartService } from '../../Services/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, ProductCard],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  prdID: string = '';
  product: Iproduct | undefined = undefined;
  brand: Ibrand | undefined = undefined;
  Math: Math = Math;
  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  quantity: number = 0;
  relatedProducts: Iproduct[] = [];
  // --------checkFavorite--------
  isFavorite = false;
  favoriteId?: number;
  userId = 1;
  // ---------toast-varibles----------
  showAddedToast: boolean = false;
  showAddedToFavoritesToast: boolean = false;
  showRemovedFromFavoritesToast: boolean = false;

  // ---------constructor---------
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private favoriteService: Favoriteservice,
    private cartService: CartService
  ) {}

  // -------ngOnInit----------
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.prdID = params.get('id') || '';
      if (this.prdID) {
        console.log(this.prdID);
        this.productService.getProdById(this.prdID).subscribe({
          next: (data) => {
            console.log(data);
            this.product = data;
            if (this.product) {
              // --------brand----------
              this.brandService
                .getBrandById(String(this.product.brandId))
                .subscribe((brandData) => {
                  console.log(brandData);
                  this.brand = brandData;
                });
              // ===related-products===
              this.productService.getAllProducts().subscribe((data) => {
                this.relatedProducts = data.filter(
                  (p) => p.categoryId === this.product?.categoryId && p.id !== this.product?.id
                );
              });
            }
            this.checkIfFavorite();
          },
          error: (err) => {
            console.error('Error fetching product details', err);
          },
        });
      } else {
        this.router.navigate(['**']);
      }
    });
  }

  // ---------check-If-Favorite------
  checkIfFavorite() {
    if (!this.product?.id) return;

    this.favoriteService
      .checkFavorite(this.userId, this.product.id)
      .subscribe((favorites: Ifavorite[]) => {
        if (favorites.length > 0) {
          this.isFavorite = true;
          this.favoriteId = favorites[0].id;
        } else {
          this.isFavorite = false;
          this.favoriteId = undefined;
        }
      });
  }

  // ------toggle-favorite----------
  toggleFavorite() {
    if (!this.product?.id) return;

    if (this.isFavorite && this.favoriteId) {
      // Remove
      this.favoriteService.removeFavorite(this.favoriteId).subscribe(() => {
        this.isFavorite = false;
        this.favoriteId = undefined;
        this.showRemovedFromFavoritesToast = true;
        this.showAddedToFavoritesToast = false;
        setTimeout(() => {
          this.showRemovedFromFavoritesToast = false;
        }, 3000);
      });
    } else {
      // Add
      this.favoriteService.addToFavorites(this.userId, this.product.id).subscribe((fav) => {
        this.isFavorite = true;
        this.favoriteId = fav.id;
        this.showAddedToFavoritesToast = true;
        this.showRemovedFromFavoritesToast = false;
        setTimeout(() => {
          this.showAddedToFavoritesToast = false;
        }, 3000);
      });
    }
  }

  // -----------selectors-for-card-----------
  selectImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }
  selectColor(color: string) {
    this.selectedColor = color;
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }
  addToCart() {
    if (this.product) {
      this.cartService
        .addToCart(this.product, this.selectedColor, this.selectedSize, this.quantity)
        .subscribe(() => {
          // alert('Added to cart successfully!');
          this.showAddedToast = true;
          setTimeout(() => {
            this.showAddedToast = false;
          }, 3000);
        });
    }
  }
  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    } else {
      this.quantity = 0;
    }
  }
  increaseQuantity() {
    if (this.product && this.quantity < Number(this.product.stock)) {
      this.quantity++;
    } else {
      this.quantity = this.product ? Number(this.product.stock) : 1;
    }
  }
}
