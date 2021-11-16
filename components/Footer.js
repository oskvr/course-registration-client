import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
// TODO: Behöver hjälp med att få till icons, får inte det att fungera.
// Får inte ikoner att fungera som det ska, kan inte ens se vad jag gör, måste liksom använda en codesandbox för att ens se skiten.
// import InstagramIcon from "@material-ui/icons/Instagram";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
        mt={60} //Funkar ju ffs inte att ens justera vart skiten ska, vad fuck är 60???
      >
        <Container maxWidth="lg">
          <Grid justifyContent="start" container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Superhäftig skola</Box>
              <Box>
                <Link href="/" color="inherit">
                  Utbildning
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Samverkan
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Superhäftiga skolans intranät
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
