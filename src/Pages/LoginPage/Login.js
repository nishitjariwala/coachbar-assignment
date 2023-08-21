import { GlobalContext } from "../../context/GlobalContext";
import { credentials, roles } from "../../Data/credentials";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const { getUserData, userData, navigate } = useContext(GlobalContext);
  const [username, setUsername] = useState("nishit101");
  const [password, setPassword] = useState("1234");

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let userData = credentials.find(
      (credential) =>
        credential.username === email && credential.password === password
    );
    data = {
      ...userData
    };
    getUserData(data);
    navigate("/");
  };
  console.log(userData);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
