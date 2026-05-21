import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  buyer: Types.ObjectId;
  seller: Types.ObjectId;
  listing: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  stripePaymentIntentId: string;
  deliveryAddress: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      default: 'pending',
    },
    stripePaymentIntentId: { type: String, default: '' },
    deliveryAddress: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

OrderSchema.index({ buyer: 1, createdAt: -1 });
OrderSchema.index({ seller: 1, status: 1 });

export default model<IOrder>('Order', OrderSchema);
