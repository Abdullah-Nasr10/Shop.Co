import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { CategoryService } from '../../Services/category-service';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../Models/icategory';
import { Iproduct } from '../../Models/iproduct';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-categories',
  imports: [ProductCard],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  catID: string = '';
  category: Icategory | undefined = undefined;
  filteredCatProd: Iproduct[] = [];
  constructor(
    private productService: ProductService,
    private CategoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.catID = params.get('id') || '';
      if (this.catID) {
        this.CategoryService.getCategoryById(this.catID).subscribe((data) => {
          this.category = data;
          console.log(this.category);
        });
        this.productService.getAllProducts().subscribe((data) => {
          this.filteredCatProd = data.filter((p) => p.categoryId == Number(this.catID));
          console.log(this.filteredCatProd);
        });
      }
    });
  }
}
