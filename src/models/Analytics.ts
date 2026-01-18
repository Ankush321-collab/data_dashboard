import mongoose, { Schema, models } from 'mongoose';

export interface IAnalytics {
  _id: string;
  userId: string;
  date: Date;
  revenue: number;
  users: number;
  orders: number;
  growthRate: number;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
    other: number;
  };
  salesData: {
    day: string;
    sales: number;
    target: number;
  }[];
  createdAt: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>(
  {
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
    users: {
      type: Number,
      required: true,
      default: 0,
    },
    orders: {
      type: Number,
      required: true,
      default: 0,
    },
    growthRate: {
      type: Number,
      required: true,
      default: 0,
    },
    deviceStats: {
      desktop: { type: Number, default: 0 },
      mobile: { type: Number, default: 0 },
      tablet: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    salesData: [
      {
        day: String,
        sales: Number,
        target: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Analytics = models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;
