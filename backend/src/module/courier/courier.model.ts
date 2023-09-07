import * as mongoose from 'mongoose';

export const CourierSchema = new mongoose.Schema({
  minWeight: { type: Number, required: true },
  maxWeight: { type: Number, required: true },
  charge: { type: Number, required: true },
});

export interface Courier {
  minWeight: number;
  maxWeight: number;
  charge: number;
}
