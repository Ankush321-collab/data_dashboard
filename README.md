# Data Dashboard - Material UI

A modern, responsive data dashboard built with Next.js 16, React 19, and Material-UI v7.

## Features

- **Dashboard Overview**: Statistics cards with key metrics, activity tracking, and quick stats
- **Analytics**: Interactive charts including line charts, bar charts, and pie charts using Recharts
- **Data Management**: Sortable, filterable data table with pagination
- **Profile**: User profile management with editable fields and skills display
- **Settings**: Comprehensive settings panel with tabs for notifications, security, appearance, and preferences
- **Login Page**: Modern authentication UI with social login options
- **Responsive Design**: Mobile-first approach with responsive sidebar and header

## Tech Stack

- **Framework**: Next.js 16.1.3 (App Router)
- **UI Library**: Material-UI v7.3.7
- **Charts**: Recharts
- **Icons**: @mui/icons-material
- **Styling**: Material-UI's sx prop system + Emotion
- **TypeScript**: Full type safety

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm start
```

## Features Breakdown

### Dashboard
- 4 key metric cards (Revenue, Users, Orders, Growth Rate)
- Activity progress bars
- Quick stats panel
- Material-UI cards and progress components

### Analytics
- Revenue & User Growth area chart
- Traffic by Device pie chart
- Weekly Sales Performance bar chart
- Toggle between time ranges (Week/Month/Year)
- Key metrics cards

### Data Management
- Sortable and searchable data table
- Pagination with customizable rows per page
- Status chips (Active/Inactive/Pending)
- Action menu for each row
- Material-UI Table components

### Profile
- Editable user information
- Contact details display
- Skills progress visualization
- Avatar and profile picture
- Material-UI form components

### Settings
- Tabbed interface (Notifications, Security, Appearance, Preferences)
- Toggle switches for notifications
- Password change form
- Session timeout configuration
- Theme selection
- Language preferences

### Login
- Email and password fields
- Remember me checkbox
- Social login buttons (Google, GitHub)
- Forgot password link
- Material-UI form components

## Navigation

- **Dashboard** (`/`): Main overview page with statistics
- **Analytics** (`/dashboard/analystics`): Data visualization and charts
- **Data** (`/dashboard/Data`): Comprehensive data table
- **Profile** (`/dashboard/profile`): User profile management
- **Settings** (`/dashboard/setting`): Application settings
- **Login** (`/login`): Authentication page

## Responsive Design

- Desktop: Full sidebar visible
- Mobile: Collapsible sidebar with hamburger menu
- Adaptive grid layout for all screen sizes
- Material-UI responsive breakpoints

## Theme Customization

The theme is configured in `src/theme/theme.ts` with:
- Primary color: Blue (#1976d2)
- Secondary color: Purple (#9c27b0)
- Custom typography using Geist fonts
- Custom component overrides (Button, Card)
- Light mode (can be extended to support dark mode)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

