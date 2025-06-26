"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { registerSchema, RegisterSchemaType } from "@/libs/validations/register.schema";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Registration failed");
      }

      toast.success("Registration successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Fill in the details to sign up.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            autoComplete="email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            autoComplete="new-password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link
                component={NextLink}
                href="/login"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
