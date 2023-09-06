import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
});

export interface Product {
  id: string;
  name: string;
  price: number;
  weight: number;
}
