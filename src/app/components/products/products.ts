import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit, OnChanges {
  products: Iproduct[] = [];
  @Input() filteredProducts: Iproduct[] | null = null;
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    if (!this.filteredProducts || this.filteredProducts.length === 0) {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Error fetching products', err);
        },
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filteredProducts'] && this.filteredProducts) {
      this.products = this.filteredProducts;
    }
  }
}
