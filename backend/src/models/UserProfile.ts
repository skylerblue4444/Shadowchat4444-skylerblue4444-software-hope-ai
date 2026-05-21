import { Schema, model, Document, Types } from 'mongoose';

export interface IUserProfile extends Document {
  user: Types.ObjectId;
  displayName: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  website: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isVerified: boolean;
  isPrivate: boolean;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    displayName: { type: String, default: '' },
    bio: { type: String, maxlength: 500, default: '' },
    avatarUrl: { type: String, default: '' },
    coverUrl: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isVerified: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    socialLinks: {
      twitter: String,
      instagram: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);

UserProfileSchema.index({ user: 1 });

export default model<IUserProfile>('UserProfile', UserProfileSchema);
