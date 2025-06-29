"use client";

import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import { ROUTES } from "@/libs/constants";
import {
  RegisterFormData,
  registerSchema,
} from "@/libs/validations/register.schema";
import { AuthService } from "@/services/AuthService";
import toast from "react-hot-toast";
import { LogoSection } from "../ui/LogoSection";

const authService = new AuthService();

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    try {
      // Call the AuthService to register the user
      await authService.register(data);

      toast.success("Registration completed successfully, now logging in");
      
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(ROUTES.DASHBOARD);
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto" }}>
      <CardContent sx={{ p: 4 }}>
        <LogoSection typographyVariant="h4"/>

        {/* <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography> */}

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Welcome! Please create your account.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                type="text"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                type="text"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Register
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={NextLink} href={ROUTES.LOGIN} underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
