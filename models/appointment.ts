import mongoose from 'mongoose';

import { PatientType } from './patient';
import { UserType } from './user';

export interface AppointmentType {
  id: string;
  patientName: string;
  patient?: PatientType;
  scheduled: Date;
  doctor: UserType;
}

const appointmentSchema = new mongoose.Schema<AppointmentType>({
  patientName: {
    type: String,
    trim: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  scheduled: {
    type: Date,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

appointmentSchema.set('toJSON', {
  transform: (_document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  }
});

export const Appointment: mongoose.Model<AppointmentType> =
  mongoose.models.Appointment ||
  mongoose.model('Appointment', appointmentSchema);
