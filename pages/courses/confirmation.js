import Link from "@/components/Link";
import { useAuth } from "@/lib/hooks/use-auth";
import Check from "@mui/icons-material/Check";
import { Button, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

export default function Confirmation() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;
  return (
    <Container maxWidth="md" sx={{ color: "white" }}>
      <Stack alignItems="center" py={25} spacing={3}>
        <Box>
          <Typography variant="h1" fontSize={50} fontWeight="bold">
            Bokningen är registrerad
            <Check
              sx={{ fontSize: 45, marginLeft: 2, color: "success.main" }}
            />
          </Typography>
        </Box>
        <Typography fontSize={20} color={grey[300]}>
          Tack för att du väljer att läsa hos oss på Superhäftiga Skolan!
        </Typography>
        <Button
          variant="outlined"
          color="success"
          component={Link}
          href="/account"
        >
          Visa mina bokningar
        </Button>
      </Stack>
    </Container>
  );
}
