import RegisterForm from "@/components/auth/RegisterForm";
import { Box } from "@mui/material";

export default function Login() {
  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
    >
      <RegisterForm />
    </Box>
  );
}