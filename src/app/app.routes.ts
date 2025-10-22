import { Routes } from '@angular/router';
import { Products } from './components/products/products';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { ProductDetails } from './components/product-details/product-details';
import { Shop } from './components/shop/shop';
import { Categories } from './components/categories/categories';
import { Brands } from './components/brands/brands';
import { Favorits } from './components/favorits/favorits';
import { Search } from './components/search/search';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
  {
    path: 'Home',
    component: Home,
    title: 'ShopCo - Home',
  },
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Shop',
    component: Shop,
    title: 'ShopCo - Shop',
  },
  {
    path: 'Products',
    component: Products,
    title: 'ShopCo - Products',
  },
  {
    path: 'Product/:id',
    component: ProductDetails,
    title: 'ShopCo - Product Details',
  },
  {
    path: 'Category/:id',
    component: Categories,
    title: 'ShopCo - Categories',
  },
  {
    path: 'Brand/:id',
    component: Brands,
    title: 'ShopCo - Brands',
  },
  {
    path: 'Favorits',
    component: Favorits,
    title: 'ShopCo - Favorits',
  },
  {
    path: 'Cart',
    component: Cart,
    title: 'ShopCo - Cart',
  },
  {
    path: 'Search/:query',
    component: Search,
    title: 'ShopCo - Search',
  },
  {
    path: '**',
    component: NotFound,
    title: 'ShopCo - Not Found',
  },
];
