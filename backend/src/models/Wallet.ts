import { Schema, model, Document, Types } from 'mongoose';

export interface IWallet extends Document {
  user: Types.ObjectId;
  balances: Map<string, number>;
  totalValueUSD: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    balances: { type: Map, of: Number, default: new Map([['USD', 0], ['BTC', 0], ['ETH', 0]]) },
    totalValueUSD: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

WalletSchema.index({ user: 1 });

export default model<IWallet>('Wallet', WalletSchema);
