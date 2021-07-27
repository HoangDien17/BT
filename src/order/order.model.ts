import * as mongoose from 'mongoose';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

export const OrderSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  products: [
    { 
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],
});

export interface ProductOrder {
  product: Product["_id"];
  quantity: Number;
}

export interface Order {
  _id: String;
  owner: User["_id"];
  totalPrice: Number;
  products: ProductOrder[];
}
