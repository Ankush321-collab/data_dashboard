'use client';
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  AttachMoney,
  People,
  ShoppingCart,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 2,
            bgcolor: `${color}.lighter`,
            color: `${color}.main`,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Typography color="text.secondary" variant="body2" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: change.startsWith('+') ? 'success.main' : 'error.main' }}
      >
        {change} from last month
      </Typography>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState([
    {
      title: 'Total Revenue',
      value: '$0',
      change: '+0%',
      icon: <AttachMoney sx={{ fontSize: 32 }} />,
      color: 'success',
    },
    {
      title: 'Total Users',
      value: '0',
      change: '+0%',
      icon: <People sx={{ fontSize: 32 }} />,
      color: 'primary',
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '+0%',
      icon: <ShoppingCart sx={{ fontSize: 32 }} />,
      color: 'warning',
    },
    {
      title: 'Growth Rate',
      value: '0%',
      change: '+0%',
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: 'secondary',
    },
  ]);

  React.useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const result = await response.json();
        const analyticsData = result.data;
        
        if (analyticsData && analyticsData.length > 0) {
          const latest = analyticsData[analyticsData.length - 1];
          const previous = analyticsData.length > 1 ? analyticsData[analyticsData.length - 2] : null;
          
          const calculateChange = (current: number, prev: number | null) => {
            if (!prev || prev === 0) return '+0%';
            const change = ((current - prev) / prev * 100).toFixed(1);
            const changeNum = parseFloat(change);
            return `${changeNum >= 0 ? '+' : ''}${change}%`;
          };

          setStats([
            {
              title: 'Total Revenue',
              value: `$${latest.revenue.toLocaleString()}`,
              change: calculateChange(latest.revenue, previous?.revenue || null),
              icon: <AttachMoney sx={{ fontSize: 32 }} />,
              color: 'success',
            },
            {
              title: 'Total Users',
              value: latest.users.toLocaleString(),
              change: calculateChange(latest.users, previous?.users || null),
              icon: <People sx={{ fontSize: 32 }} />,
              color: 'primary',
            },
            {
              title: 'Total Orders',
              value: latest.orders.toLocaleString(),
              change: calculateChange(latest.orders, previous?.orders || null),
              icon: <ShoppingCart sx={{ fontSize: 32 }} />,
              color: 'warning',
            },
            {
              title: 'Growth Rate',
              value: `${latest.growth}%`,
              change: calculateChange(latest.growth, previous?.growth || null),
              icon: <TrendingUp sx={{ fontSize: 32 }} />,
              color: 'secondary',
            },
          ]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" mb={3}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: 'Sales Performance', value: 75 },
                { label: 'Customer Satisfaction', value: 88 },
                { label: 'Product Quality', value: 92 },
                { label: 'Delivery Time', value: 68 },
              ].map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={item.value}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Stats
            </Typography>
            <Box sx={{ mt: 3 }}>
              {[
                { label: 'Active Sessions', value: '245' },
                { label: 'Bounce Rate', value: '32%' },
                { label: 'Avg. Session', value: '3:24' },
                { label: 'New Visitors', value: '1,234' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                    pb: 2,
                    borderBottom: index < 3 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
