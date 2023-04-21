import mongoose from 'mongoose';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Connected');
    
    return mongoose.connection.asPromise();
  }
  return await mongoose.connect(process.env.MONGODB_URI!).then(() => console.log('Connected 2'));
};
