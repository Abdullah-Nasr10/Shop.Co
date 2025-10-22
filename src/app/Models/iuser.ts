// import { IcartItem } from './icart-item';
import { ICart } from './icart';
// import { Iorder } from './iorder';

export interface Iuser {
  id: number;
  name: string;
  email: string;
  password: string;
  favorites: number[];
  cart: ICart[];
}
