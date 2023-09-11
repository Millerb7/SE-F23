import React, { useState, FormEvent } from "react";
import {
  Box,
  Grid,
  Link,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth";

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams(); // Retrieve the token from the URL

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setMessage("");
    setLoading(true);

    // Use the update password logic from your AuthService
    if (token) {
      AuthService.updatePassword(token, password).then(
        () => {
          navigate("/login"); // Redirecting to login page after successful password update
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setMessage("Invalid token.");
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          {" "}
          Update Password{" "}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="New Password"
            type="password"
            margin="normal"
            required
            fullWidth
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoFocus
          />
          <TextField
            label="Confirm New Password"
            type="password"
            margin="normal"
            required
            fullWidth
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ mt: 4, mb: 3 }}
          >
            Update Password
          </LoadingButton>
          <FormHelperText>{message}</FormHelperText>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
