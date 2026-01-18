import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectDB();

    // Get or create analytics data for user
    let analytics = await Analytics.find({ userId: decoded.userId }).sort({ date: -1 }).limit(7);

    // If no data exists, create sample data
    if (analytics.length === 0) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const sampleData = days.map((day, index) => ({
        userId: decoded.userId,
        date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000),
        revenue: Math.floor(Math.random() * 5000) + 3000,
        users: Math.floor(Math.random() * 5000) + 2000,
        orders: Math.floor(Math.random() * 2000) + 1000,
        growthRate: Math.floor(Math.random() * 30) + 60,
        deviceStats: {
          desktop: Math.floor(Math.random() * 200) + 300,
          mobile: Math.floor(Math.random() * 150) + 250,
          tablet: Math.floor(Math.random() * 100) + 150,
          other: Math.floor(Math.random() * 50) + 50,
        },
        salesData: days.map((d) => ({
          day: d,
          sales: Math.floor(Math.random() * 10) + 10,
          target: 15,
        })),
      }));

      analytics = await Analytics.insertMany(sampleData);
    }

    return NextResponse.json({ success: true, analytics }, { status: 200 });
  } catch (error: any) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const data = await request.json();

    await connectDB();

    const analytics = await Analytics.create({
      userId: decoded.userId,
      ...data,
    });

    return NextResponse.json({ success: true, analytics }, { status: 201 });
  } catch (error: any) {
    console.error('Create analytics error:', error);
    return NextResponse.json({ error: 'Failed to create analytics' }, { status: 500 });
  }
}
