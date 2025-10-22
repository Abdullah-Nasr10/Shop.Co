export interface Iproduct {
  id: number;
  name: string;
  categoryId: number;
  brandId: number;
  rate: number;
  price: number;
  colors: string[];
  images: string[];
  sizes: string[];
  description?: string;
  stock?: number;
}
