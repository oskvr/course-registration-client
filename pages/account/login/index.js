import LoginForm from '../../../components/LoginForm';
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function index() {

    // Får göra en seriösare check när jag vet hur vi ska förvara token

    let token = "";

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem('token')    
    }

    const onLogoutClicked = () => {
        window.localStorage.setItem('token', "");
    }

    if(token){
        return(
          <Container
            sx={{
              display: "grid",
              justifyContent: "center",
              paddingTop: 15,
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" fontWeight="light" textAlign="center" marginBottom="15px">
                Du är inloggad
              </Typography>
              <Button type="submit" variant="contained" onClick={onLogoutClicked} >
                Logga ut
              </Button>
            </Box>
          </Container>
        )
    }
    else{
        return(
            <LoginForm></LoginForm>
        )        
    }
}