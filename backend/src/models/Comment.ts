import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
  post: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  parentComment: Types.ObjectId | null;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 2000 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CommentSchema.index({ post: 1, createdAt: 1 });

export default model<IComment>('Comment', CommentSchema);
