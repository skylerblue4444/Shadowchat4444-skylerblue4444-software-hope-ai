import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  type: 'like' | 'comment' | 'follow' | 'message' | 'trade' | 'order' | 'system';
  title: string;
  body: string;
  referenceId: string;
  referenceModel: string;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'message', 'trade', 'order', 'system'],
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    referenceId: { type: String, default: '' },
    referenceModel: { type: String, default: '' },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

export default model<INotification>('Notification', NotificationSchema);
