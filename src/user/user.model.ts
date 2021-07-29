import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { 
    type: String,
    enum: ['admin', 'custom'],
    default: 'custom'
  }
});

export interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}
