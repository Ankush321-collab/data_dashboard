# Data Dashboard - Setup Guide

## Prerequisites
- Node.js installed
- MongoDB installed locally

## 1. Install Dependencies
```bash
npm install
```

## 2. Start MongoDB Server
Before running the application, start your local MongoDB server:

```bash
# Windows (Run in a separate terminal)
mongod

# Or if MongoDB is installed as a service:
net start MongoDB
```

## 3. Environment Variables
Make sure you have `.env.local` file with:
```
MONGODB_URI=mongodb://localhost:27017/data_dashboard
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXTAUTH_SECRET=your-super-secret-nextauth-key-change-this-too
```

## 4. Run the Development Server
```bash
npm run dev
```

## 5. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting Started

### First Time Setup:
1. **Create an Account**: Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
   - Fill in all required fields
   - Password must be at least 6 characters
   - Accept terms and conditions

2. **Login**: After signup, you'll be redirected to login at [http://localhost:3000/login](http://localhost:3000/login)
   - Use your email and password

3. **Explore Dashboard**: Once logged in, you'll see:
   - **Dashboard**: Overview with statistics (revenue, users, orders, growth)
   - **Analytics**: Charts and graphs with real data
   - **Data Management**: Table with user data entries
   - **Profile**: Your user profile (editable)
   - **Settings**: Application settings

## Features

### Authentication
- ✅ Signup with validation
- ✅ Login with JWT tokens
- ✅ Secure HTTP-only cookies
- ✅ Logout functionality
- ✅ Protected routes

### Dashboard
- ✅ Real-time statistics from MongoDB
- ✅ Dynamic charts and graphs
- ✅ Data table with search and pagination
- ✅ Profile management

### Data
All data is **real and stored in MongoDB**:
- Analytics data (revenue, users, orders, growth metrics)
- User profiles (name, email, phone, location, position, bio)
- Data entries (table records with status tracking)

### Auto-Generated Sample Data
When you first login, the system automatically generates:
- 7 days of sample analytics data
- 10 sample data table entries
- Realistic values for testing

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Data
- `GET /api/analytics` - Fetch analytics data
- `POST /api/analytics` - Create analytics entry
- `GET /api/data` - Fetch data table entries
- `POST /api/data` - Create data entry
- `DELETE /api/data?id=<id>` - Delete data entry
- `PUT /api/user` - Update user profile
- `PATCH /api/user` - Change password

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or `net start MongoDB`
- Check if port 27017 is available
- Verify `.env.local` has correct MONGODB_URI

### Authentication Issues
- Clear browser cookies if having login issues
- Check browser console for error messages
- Verify JWT_SECRET is set in `.env.local`

### Development Server Issues
- Try deleting `.next` folder and restart: `rm -rf .next && npm run dev`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Tech Stack
- **Frontend**: Next.js 16, React 19, Material-UI 7, TypeScript
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Charts**: Recharts
- **State Management**: React Context API

## Database Schema

### User
- name, email, password (hashed)
- phone, location, position, bio, avatar
- role (Admin/Manager/User)

### Analytics
- userId, date
- revenue, users, orders, growth
- deviceStats (desktop, mobile, tablet, other)
- salesData (weekly sales with targets)

### DataEntry
- userId, name, email
- status (Active/Inactive/Pending)
- role, lastLogin, orders

## Security Notes
- Passwords are hashed using bcrypt (12 rounds)
- JWT tokens stored in HTTP-only cookies
- Token expiration: 7 days
- All API routes verify authentication

## Next Steps
1. Customize the dashboard components
2. Add more analytics features
3. Implement real-time updates
4. Add data visualization options
5. Export data functionality

Enjoy your Data Dashboard! 🚀
