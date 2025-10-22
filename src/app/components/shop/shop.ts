import { Component, OnInit } from '@angular/core';
import { Products } from '../products/products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../Models/iproduct';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-shop',
  imports: [Products, FormsModule, CommonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop implements OnInit {
  allProducts: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  colors: string[] = [
    'black',
    'khaki',
    'navy',
    'blue',
    'coral',
    'white',
    'orange',
    'cadetblue',
    'grey',
    'lightblue',
    'olive',
    'green',
    'darkkhaki',
    'beige',
    'dodgerblue',
    'lightgrey',
    'floralwhite',
    'royalblue',
  ];

  // ---------------- Selected Filters ----------------
  selectedPrice: number = 2000;
  selectedColor: string = '';
  selectedCategories: number[] = [];
  selectedBrands: number[] = [];
  appliedPrice: number = 0;

  // -------constructor----------------
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.filteredProducts = data;
    });
  }

  // ================ Filter Actions ================
  // ----category-----
  toggleCategory(categoryId: number, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== categoryId);
    }
    console.log('Selected Categories:', this.selectedCategories);
    this.applyFilters();
  }

  // ----brand-----
  toggleBrand(brandId: number, event: any) {
    if (event.target.checked) {
      this.selectedBrands.push(brandId);
    } else {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brandId);
    }
    console.log('Selected Brands:', this.selectedBrands);
    this.applyFilters();
  }

  // ----price-----
  applyPriceFilter() {
    this.appliedPrice = this.selectedPrice;
    console.log('Applied Price Filter:', this.appliedPrice);
    this.applyFilters();
  }

  // ----color-----
  selectColor(color: string) {
    this.selectedColor = color;
    console.log('Selected Color:', this.selectedColor);
    this.applyFilters();
  }

  // ==========apply-filters==========
  applyFilters() {
    this.filteredProducts = this.allProducts.filter((product) => {
      const matchPrice = product.price <= this.selectedPrice;
      const matchColor = this.selectedColor
        ? product.colors && product.colors.includes(this.selectedColor)
        : true;
      const matchCategory =
        this.selectedCategories.length > 0
          ? this.selectedCategories.includes(product.categoryId)
          : true;
      const matchBrand =
        this.selectedBrands.length > 0 ? this.selectedBrands.includes(product.brandId) : true;

      return matchPrice && matchColor && matchCategory && matchBrand;
    });
  }
  // ==========clear-filters==========
  clearAllFilters() {
    this.selectedPrice = 2000;
    this.selectedColor = '';
    this.selectedCategories = [];
    this.selectedBrands = [];
    this.appliedPrice = 0;
    this.filteredProducts = this.allProducts;
    const inputs = document.querySelectorAll('input[type="checkbox"]');
    inputs.forEach((input: any) => (input.checked = false));
  }
}
