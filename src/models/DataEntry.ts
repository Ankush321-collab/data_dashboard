import mongoose, { Schema, models } from 'mongoose';

export interface IDataEntry {
  _id: string;
  userId: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  role: string;
  lastLogin: Date;
  orders: number;
  createdAt: Date;
}

const DataEntrySchema = new Schema<IDataEntry>(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
      default: 'Active',
    },
    role: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    orders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const DataEntry = models.DataEntry || mongoose.model<IDataEntry>('DataEntry', DataEntrySchema);

export default DataEntry;
