import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "@/components/Link";
export default function Home() {
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
        }}
      >
        <Typography variant="h3" fontWeight="light" textAlign="center">
          Min profil
        </Typography>
      </Box>
    </Container>
  );
}
