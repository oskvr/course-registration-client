import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api/helpers";
import { Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await registerUserAsync(firstName, lastName, email, password);
    if (res.ok) {
      router.push("/account/login");
    }
  }
  async function registerUserAsync(firstName, lastName, email, password) {
    const userBody = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
    };

    const res = await fetch(BASE_URL + "/user/registerUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userBody),
    });
    return res;
  }
  async function handleGoogleSuccess(googleResponse) {
    const token = googleResponse.tokenId;
    const { email, familyName, givenName } = googleResponse.profileObj;
    const res = await registerUserAsync(
      givenName,
      familyName,
      email,
      "MåsteSkickaInNågotLösenord" // temp
    );
    console.log(res);
  }
  function handleGoogleFail(res) {
    console.error("Google login failed:", res);
  }
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
          Skapa nytt konto
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Förnamn"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Efternamn"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Lösenord"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrera
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Har du redan ett konto? Logga in
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
              clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
              buttonText="Fortsätt med Google"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
