import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../Services/brand-service';
import { ProductService } from '../../Services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Ibrand } from '../../Models/ibrand';
import { Iproduct } from '../../Models/iproduct';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-brands',
  imports: [ProductCard],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands implements OnInit {
  brandID: string = '';
  brand: Ibrand | undefined = undefined;
  filteredBrandProduct: Iproduct[] = [];
  constructor(
    private brandService: BrandService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.brandID = params.get('id') || '';
      if (this.brandID) {
        this.brandService.getBrandById(this.brandID).subscribe((data) => {
          this.brand = data;
          console.log(this.brand);
        });
        this.productService.getAllProducts().subscribe((data) => {
          this.filteredBrandProduct = data.filter((p) => p.brandId == Number(this.brandID));
          console.log(this.filteredBrandProduct);
        });
      }
    });
  }
}
