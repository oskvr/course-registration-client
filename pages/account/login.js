import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "@/components/Link";
import GoogleLogin from "react-google-login";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onGoogleLogin, redirect, isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Login-sidan behöver inte visas om man redan är inloggad
    if (isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const handleSuccess = (response) => {
    onGoogleLogin(response);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onLogin(email, password);
    router.push(redirect);
  };
  const handleFailure = (response) => {
    console.log("google-respons", response);
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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              theme="dark"
              clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
              buttonText="Login"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            >
              <span>Logga in med google</span>
            </GoogleLogin>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
