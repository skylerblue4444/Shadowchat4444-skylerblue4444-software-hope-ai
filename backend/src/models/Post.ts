import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
  author: Types.ObjectId;
  content: string;
  mediaUrls: string[];
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  shares: number;
  tags: string[];
  visibility: 'public' | 'friends' | 'private';
  isDeleted: boolean;
  isFlagged: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 5000 },
    mediaUrls: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    shares: { type: Number, default: 0 },
    tags: [{ type: String }],
    visibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
    isDeleted: { type: Boolean, default: false },
    isFlagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PostSchema.index({ author: 1, createdAt: -1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ visibility: 1 });

export default model<IPost>('Post', PostSchema);
