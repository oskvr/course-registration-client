import {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "./Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleLogin from 'react-google-login';
import { Divider } from "@mui/material";

export default function login() {

  const handleSucces = (response) => {    
    console.log("google-respons", response)
    localStorage.setItem('token', response.tokenId);
    location.reload();
  }

  const handleFailure = (response) => {    
    console.log("google-respons", response)
  }

  const [email,setEmail] = useState('');
  const [passWord, setPassWord] = useState('');

  const requestBody = {
    "email": email,
    "password": passWord
  };

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPassWordChanged = (e) => setPassWord(e.target.value);

  const handleSubmit = async (event) => {

    event.preventDefault();

    const res = await fetch('https://localhost:44314/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    const data = await res.text();

    console.log(res);

    console.log(data);

    localStorage.setItem('token', data);

    location.reload();  
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ minHeight: "70vh", display: "grid", placeItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logga in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={onEmailChanged}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={passWord}
            onChange={onPassWordChanged}
            name="password"
            label="Lösenord"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="Submitn"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Logga in
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/account/register" variant="body2">
                {"Har du inget konto? Registrera"}
              </Link>
            </Grid>
          </Grid>
          <Box>
            <Box display="flex" alignItems="center" paddingY={3}>
              <Divider sx={{ flex: "1" }} />
              <Typography
                component="span"
                marginX={1}
                color="text.secondary"
                sx={{ pointerEvents: "none" }}
              >
                eller
              </Typography>
              <Divider sx={{ flex: "1" }} />
            </Box>
            <GoogleLogin
                clientId="659087919219-060lh08m0biorqnlaghc26elkvo609oa.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleSucces}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}>
                  <span>Logga in med google</span>
            </GoogleLogin>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}