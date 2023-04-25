import mongoose from 'mongoose';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection.db;
  }
  return await mongoose.connect(process.env.MONGODB_URI!).then(() => {
    require('../models/company');
    require('../models/entry');
    require('../models/patient');
    require('../models/user');
    require('../models/appointment');
  });
};
