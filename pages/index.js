import Link from "@/components/Link";
import { useUser } from "@/lib/hooks/use-user";
import { Button, Container, Rating, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function Home() {
  const { isLoggedIn } = useUser();
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
              På Superhäftiga skolans kursportal hittar du tOpPmOdErNa kurser
              och bokar dem enkelt med ett knapptryck
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
