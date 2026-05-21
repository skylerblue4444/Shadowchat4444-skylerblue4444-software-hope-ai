import { Schema, model, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  conversationId: string;
  content: string;
  mediaUrl: string;
  messageType: 'text' | 'image' | 'file' | 'audio';
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    conversationId: { type: String, required: true },
    content: { type: String, default: '' },
    mediaUrl: { type: String, default: '' },
    messageType: { type: String, enum: ['text', 'image', 'file', 'audio'], default: 'text' },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

MessageSchema.index({ conversationId: 1, createdAt: 1 });
MessageSchema.index({ sender: 1, receiver: 1 });

export default model<IMessage>('Message', MessageSchema);
