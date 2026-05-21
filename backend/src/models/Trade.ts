import { Schema, model, Document, Types } from 'mongoose';

export interface ITrade extends Document {
  user: Types.ObjectId;
  pair: string;
  side: 'buy' | 'sell';
  orderType: 'market' | 'limit' | 'stop';
  amount: number;
  price: number;
  filledAmount: number;
  status: 'pending' | 'open' | 'filled' | 'cancelled' | 'partial';
  fee: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const TradeSchema = new Schema<ITrade>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pair: { type: String, required: true },
    side: { type: String, enum: ['buy', 'sell'], required: true },
    orderType: { type: String, enum: ['market', 'limit', 'stop'], default: 'market' },
    amount: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    filledAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'open', 'filled', 'cancelled', 'partial'], default: 'pending' },
    fee: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TradeSchema.index({ user: 1, createdAt: -1 });
TradeSchema.index({ pair: 1, status: 1 });

export default model<ITrade>('Trade', TradeSchema);
