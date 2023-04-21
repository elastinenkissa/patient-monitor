import mongoose from 'mongoose';

import { HealthRating } from './patient';
import { UserType } from './user';

type Doctor = Omit<
  UserType,
  | 'identificationNumber'
  | 'company'
  | 'imageUrl'
  | 'isAdministrator'
  | 'isOwner'
>;

export interface EntryType {
  id: string;
  by: Doctor;
  content: string;
  addedDiagnosis: Array<string>;
  removingDiagnosis: Array<string>;
  addedPrescriptions: Array<string>;
  removingPrescriptions: Array<string>;
  newHealthRating: HealthRating;
  lastUpdated: Date;
}

const entrySchema = new mongoose.Schema<EntryType>({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  addedDiagnosis: [
    {
      type: String
    }
  ],
  addedPrescriptions: [{ type: String }],
  removingDiagnosis: [{ type: String }],
  removingPrescriptions: [{ type: String }],
  newHealthRating: {
    type: Number,
    required: true
  },
  lastUpdated: {
    type: Date
  }
});

entrySchema.pre('save', function (next) {
  this.lastUpdated = new Date();

  next();
});

entrySchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Entry: mongoose.Model<EntryType> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema);
