import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import DataEntry from '@/models/DataEntry';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    await connectDB();

    // Get data entries for user
    let dataEntries = await DataEntry.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    // If no data exists, create sample data
    if (dataEntries.length === 0) {
      const sampleData = [
        { name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin', orders: 45 },
        { name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User', orders: 32 },
        { name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User', orders: 18 },
        { name: 'Alice Brown', email: 'alice@example.com', status: 'Pending', role: 'User', orders: 0 },
        { name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Active', role: 'Manager', orders: 67 },
        { name: 'Eva Martinez', email: 'eva@example.com', status: 'Active', role: 'User', orders: 23 },
        { name: 'David Lee', email: 'david@example.com', status: 'Active', role: 'User', orders: 41 },
        { name: 'Sarah Taylor', email: 'sarah@example.com', status: 'Inactive', role: 'User', orders: 15 },
        { name: 'Mike Anderson', email: 'mike@example.com', status: 'Active', role: 'Admin', orders: 89 },
        { name: 'Lisa White', email: 'lisa@example.com', status: 'Active', role: 'User', orders: 28 },
      ].map((entry) => ({
        ...entry,
        userId: decoded.userId,
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      }));

      dataEntries = await DataEntry.insertMany(sampleData);
    }

    return NextResponse.json({ success: true, data: dataEntries }, { status: 200 });
  } catch (error: any) {
    console.error('Data entries error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
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

    const dataEntry = await DataEntry.create({
      userId: decoded.userId,
      ...data,
    });

    return NextResponse.json({ success: true, data: dataEntry }, { status: 201 });
  } catch (error: any) {
    console.error('Create data entry error:', error);
    return NextResponse.json({ error: 'Failed to create data entry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectDB();

    const result = await DataEntry.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ error: 'Data entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Delete data entry error:', error);
    return NextResponse.json({ error: 'Failed to delete data entry' }, { status: 500 });
  }
}
