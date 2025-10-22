import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../Services/brand-service';
import { Ibrand } from '../../Models/ibrand';
import { ProductService } from '../../Services/product-service';
import { Iproduct } from '../../Models/iproduct';
import { ProductCard } from '../product-card/product-card';
import { CategoryService } from '../../Services/category-service';
import { Icategory } from '../../Models/icategory';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  brands: Ibrand[] = [];
  products: Iproduct[] = [];
  categories: Icategory[] = [];
  // -------constructor----------------
  constructor(
    private brandService: BrandService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ---------get-all-brands-----------
    this.brandService.getAllBrands().subscribe((data) => {
      console.log(data);
      this.brands = data;
    });
    // ---------get-all-products-----------
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
    // ---------get-all-categories-----------
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }

  goToShop() {
    this.router.navigate(['Shop']);
  }
  goToBrand(id: number) {
    this.router.navigate(['Brand', id]);
  }
  goToCategory(id: number) {
    this.router.navigate(['Category', id]);
  }
}
