import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
  name: String, 
  quantity: Number,
  price: Number,
});

export interface Product {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}
