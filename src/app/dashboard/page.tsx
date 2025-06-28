import type React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from "@mui/icons-material";

const StatCard = ({
  title,
  value,
  icon,
  color,
  change,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  change: string;
}) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4" component="div" fontWeight={600}>
            {value}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="success.main">
        {change} from last month
      </Typography>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$45,231"
            icon={<AttachMoney />}
            color="#1976d2"
            change="+20.1%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Users"
            value="2,350"
            icon={<People />}
            color="#dc004e"
            change="+15.3%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Orders"
            value="1,234"
            icon={<ShoppingCart />}
            color="#2e7d32"
            change="+12.5%"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Growth Rate"
            value="23.5%"
            icon={<TrendingUp />}
            color="#ed6c02"
            change="+8.2%"
          />
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Recent Activity
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  "New user John Doe registered",
                  "Order #1234 has been completed",
                  "Product inventory updated",
                  "System backup completed successfully",
                ].map((activity, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Typography variant="body2">{activity}</Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[
                  "Add New User",
                  "Create Product",
                  "Generate Report",
                  "System Settings",
                ].map((action, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                  >
                    <Typography variant="body2">{action}</Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
