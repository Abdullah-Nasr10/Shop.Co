export interface ICartItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  color: string;
  size: string;
  cartId?: number;
  productName?: string;
  image?: string[];
}

export interface ICart {
  id?: number;
  userId: number;
  items: ICartItem[];
  total: number;
}
