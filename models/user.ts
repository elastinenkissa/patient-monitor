import mongoose from 'mongoose';

import { HealthcareCompany } from './company';
import { PatientType } from './patient';

export interface UserType extends mongoose.Document {
  id: string;
  name: string;
  username: string;
  identificationNumber: string;
  company: HealthcareCompany;
  patients: Array<PatientType>;
  recentPatients: Array<PatientType>;
  imageUrl?: string;
  isAdministrator?: boolean;
  isOwner?: boolean;
}

export type Employee = UserType;

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  identificationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
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
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ],
  recentPatients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const User: mongoose.Model<UserType> =
  mongoose.models.User || mongoose.model('User', userSchema);
