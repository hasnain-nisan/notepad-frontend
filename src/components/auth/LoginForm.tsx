"use client";

import React, { use } from "react";
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
import { loginSchema, LoginSchemaType } from "@/libs/validations/login.schema";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

// import { useAuth } from "@/hooks/auth.hooks";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // const { login, isLoading, error } = useAuth(); // placeholder for actual login logic

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Login successful!");
      router.push("/dashboard");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Welcome back! Please sign in to your account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign In"}
          </Button>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an account?{" "}
              <Link
                component={NextLink}
                href="/register"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
