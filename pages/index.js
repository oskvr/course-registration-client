import { Button, Container, Grid, Typography } from "@mui/material";
import { Box, height, margin } from "@mui/system";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Image from "next/image";
import Link from "@/components/Link";
import { useAuth } from "@/lib/auth";

export default function Home() {

  const { user, isLoggedIn } = useAuth();

    return (
      <Container
        sx={{
          display: "grid",
          justifyContent: "center",
          paddingTop: 15,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {isLoggedIn ? (
            <>
              <Avatar 
                sx={{ 
                  fontSize: 40, 
                  bgcolor: deepPurple[500], 
                  height: 100, 
                  width: 100}}
              >
                {/* {user.firstName.charAt(0) + user.lastName.charAt(0)} */}
              </Avatar>
              <Typography variant="h4" fontWeight="light" textAlign="center" margin="30px">
                Du är inloggad som {user? user.firstName : ""} {user?  user.lastName : ""}
              </Typography>
              <Button width="200px" variant="contained" component={Link} href="/courses">
                Visa kurser
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h4" fontWeight="light" textAlign="center">
                Logga in eller registrera dig för att boka superhäftiga kurser!
              </Typography>
              <Image src="/undraw_education.svg" width="400" height="400" alt="" />
              <Button variant="contained" component={Link} href="/courses">
                Visa kurser
              </Button>
            </>
          )}
        </Box>
      </Container>
    );
}
