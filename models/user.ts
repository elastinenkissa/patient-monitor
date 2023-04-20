import mongoose from 'mongoose';
import { HealthcareCompany } from './company';

export interface UserType {
  id: string;
  name: string;
  identificationNumber: string;
  company: HealthcareCompany;
  imageUrl?: string;
  isAdministrator?: boolean;
  isOwner?: boolean;
}

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true
  },
  isAdministrator: {
    type: Boolean
  },
  isOwner: {
    type: Boolean
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  imageUrl: {
    type: String
  }
});

userSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

userSchema.pre('save', function (next) {
  this.imageUrl =
    'https://th.bing.com/th/id/R.2212e2e523684c91bb6ade690d9e3fc0?rik=jKD89fg3ekClvw&pid=ImgRaw&r=0';

  next();
});

export const User: mongoose.Model<UserType> =
  mongoose.models.User || mongoose.model('User', userSchema);
