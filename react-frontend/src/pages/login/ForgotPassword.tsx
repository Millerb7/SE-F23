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
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";

const ForgotPassword: React.FC = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);
    // Add your forgot password logic
    console.log(username);
    AuthService.forgotPassword(username).then(
      () => {
        navigate("/home");
        // window.location.reload();
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
          Forgot Password{" "}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="Username"
            margin="normal"
            required
            fullWidth
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoFocus
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ mt: 4, mb: 3 }}
          >
            Send Email
          </LoadingButton>
          <FormHelperText>{message}</FormHelperText>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
