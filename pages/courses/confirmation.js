import Link from "@/components/Link";
import { useAuth } from "@/lib/auth";
import { Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useRouter } from "next/router";

export default function Confirmation() {

    const { query } = useRouter();

    console.log(query.status);

    return (
      <>
        <Box
          component="section"
        >
          <Container maxWidth="md" sx={{ color: "white" }}>
            <Stack maxWidth="35rem" py={25} spacing={3}>
              { query.status === 200 ? (
                  <>
                    <Box>
                      <Typography variant="h1" fontSize={50} fontWeight="bold">
                        Bokningen är registrerad.
                      </Typography>
                    </Box>
                    <Typography fontSize={20} color={grey[300]}>
                      Tack för att du väljer att läsa hos oss på Superhäftiga Skolan!
                    </Typography>
                  </>
                ) : (
                  <>
                    <Box>
                      <Typography variant="h1" fontSize={50} fontWeight="bold">
                        Någonting gick fel...
                      </Typography>
                    </Box>
                    <Typography fontSize={20} color={grey[300]}>
                      Vi ber om ursäkt men någonting gick tyvärr fel med din bokning
                    </Typography>
                  </>
                )
              }
              
            </Stack>
          </Container>
        </Box>
      </>
    );
  }