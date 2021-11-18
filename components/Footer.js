import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "./Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      component="footer"
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 3, sm: 5 }}
      bgcolor="text.secondary"
      color="white"
    >
      <Container maxWidth="lg">
        <Grid justifyContent="start" container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Superhäftig skola</Box>
            <Box>
              <Link href="/">Utbildning</Link>
            </Box>
            <Box>
              <Link href="/">Samverkan</Link>
            </Box>
            <Box>
              <Link href="/">Superhäftiga skolans intranät</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Superhäftig skola</Box>
            <Box>
              <Link href="/">Utbildning</Link>
            </Box>
            <Box>
              <Link href="/">Samverkan</Link>
            </Box>
            <Box>
              <Link href="/">Superhäftiga skolans intranät</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Kontakt</Box>
            <Box>
              <Link href="/">
                Superhäftiga skolan <br /> Västra Finnbodavägen 4 <br /> 131 30
                Nacka
              </Link>
            </Box>
            <Box>
              <Link href="/">
                <InstagramIcon /> <TwitterIcon /> <FacebookIcon />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
          Superhäftiga Skolan &reg; 2021
        </Box>
      </Container>
    </Box>
  );
}
