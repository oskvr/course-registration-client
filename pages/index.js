import Link from "@/components/Link";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button, Container, Rating, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepPurple, grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Image from "next/image";

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  return (
    <>
      <Box
        component="section"
        sx={{
          backgroundImage: "url('/wallpaper.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Container maxWidth="md" sx={{ color: "white" }}>
          <Stack maxWidth="35rem" py={25} spacing={3}>
            <Box>
              <Typography variant="h1" fontSize={50} fontWeight="bold">
                Boka och hantera kurser
              </Typography>

              <Typography variant="h3" color="primary">
                Snabbt och enkelt
              </Typography>
            </Box>
            <Typography fontSize={20} color={grey[300]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
              nunc nunc. In augue quam, fermentum.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" component={Link} href="/courses">
                Visa kurser
              </Button>
              {isLoggedIn ? (
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  href="/account"
                >
                  Mitt konto
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  href="/account/login"
                >
                  Logga in
                </Button>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container component="section" maxWidth="sm" sx={{ paddingY: 8 }}>
        <Stack direction="row" spacing={6}>
          <Avatar
            src="https://d3bzyjrsc4233l.cloudfront.net/news/Harold.jpg"
            sx={{ height: "100px", width: "100px" }}
          />
          <Stack spacing={2}>
            <Typography
              position="relative"
              sx={{
                ":before": {
                  display: "block",
                  pl: "10px",
                  fontFamily: "sans-serif",
                  content: `"\\201C"`,
                  fontSize: "80px",
                  position: "absolute",
                  left: "-40px",
                  top: "-40px",
                  color: "text.secondary",
                },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
              nunc nunc. In augue quam, fermentum eu metus eu, gravida molestie
              risus.
            </Typography>
            <Rating name="read-only" value={1} readOnly />
            <Typography color="text.secondary">- Sven Svensson</Typography>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

// Ta bort den här
function OldHero() {
  return (
    <Container
      sx={{
        display: "grid",
        justifyContent: "center",
        minHeight: "70vh",
        paddingTop: 15,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoggedIn ? (
          <>
            <Avatar
              sx={{
                fontSize: 40,
                bgcolor: deepPurple[500],
                height: 100,
                width: 100,
              }}
            >
              {/* {user?.firstName.charAt(0) + user?.lastName.charAt(0)} */}
            </Avatar>
            <Typography
              variant="h4"
              fontWeight="light"
              textAlign="center"
              margin="30px"
            >
              Du är inloggad som {user ? user.firstName : ""}{" "}
              {user ? user.lastName : ""}
            </Typography>
            <Button
              width="200px"
              variant="contained"
              component={Link}
              href="/courses"
            >
              Visa kurser
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="light" textAlign="center">
              Logga in eller registrera dig för att boka superhäftiga kurser!
            </Typography>
            <Image
              src="/undraw_education.svg"
              width="400"
              height="400"
              alt=""
            />
            <Button variant="contained" component={Link} href="/courses">
              Visa kurser
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
