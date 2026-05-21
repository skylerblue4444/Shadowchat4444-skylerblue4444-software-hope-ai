import { Schema, model, Document, Types } from 'mongoose';

export interface IListing extends Document {
  seller: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  imageUrls: string[];
  stock: number;
  sold: number;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ListingSchema = new Schema<IListing>(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 5000 },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    category: { type: String, required: true },
    tags: [{ type: String }],
    imageUrls: [{ type: String }],
    stock: { type: Number, default: -1 }, // -1 = unlimited
    sold: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ListingSchema.index({ seller: 1 });
ListingSchema.index({ category: 1, isActive: 1 });
ListingSchema.index({ tags: 1 });
ListingSchema.index({ price: 1 });

export default model<IListing>('Listing', ListingSchema);
