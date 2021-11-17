import {useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "../../../components/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function login() {

  const [email,setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const requestBody = {
      "email": email,
      "password": passWord
    };

    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPassWordChanged = (e) => setPassWord(e.target.value);

  const handleSubmit = async (event) => {

    debugger;

    const res = await fetch('https://localhost:44314/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    console.log(res)

    console.log("HEj")


    // localStorage.setItem('token', data);

    event.preventDefault();
    // .then(res => res.text().then(data => {
    //     // window.localStorage.setItem('token', data.token);
    //     console.log(data);
    // }));

    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
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
            type="submit"
            fullWidth
            variant="contained"
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
        </Box>
      </Box>
    </Container>
  );
}
