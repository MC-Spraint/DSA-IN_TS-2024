import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Product document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Product schema
const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', productSchema);
export default Product;
