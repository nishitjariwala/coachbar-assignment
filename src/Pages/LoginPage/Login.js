import { GlobalContext } from "../../context/GlobalContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

export default function Login() {
  const { setUserData, userData, navigate } = useContext(GlobalContext);
  const [username, setUsername] = useState("nishit.jariwala");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields.');
    } else {
      fetch("./users.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let userData = data.find(
            (credential) =>
              credential.username === username && credential.password === password
          );
          console.log("Here")
          if (userData) {
            let data = {
              username: userData.username,
              name: userData.name
            }
            localStorage.setItem("userData", JSON.stringify(data))
            setUserData(data);
            navigate("/");
          } else {
            setError('Invalid username or password.');
          }
        }).catch(e=>{
          console.log(e)
        });
      
    }


  };

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
            error={error && username.trim() === ''}
            helperText={error && username.trim() === '' && 'Username is required'}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && password.trim() === ''}
            helperText={error && password.trim() === '' && 'Password is required'}
          />
          {error && <Typography color="error">{error}</Typography>}
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
