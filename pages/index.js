import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "../components/Link";
export default function Home() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" fontWeight="light" textAlign="center">
          Någon titel
        </Typography>
        <Image src="/undraw_education.svg" width="400" height="400" alt="" />
        <Button variant="contained" component={Link} href="/courses">
          Visa kurser
        </Button>
      </Box>
    </Box>
  );
}
