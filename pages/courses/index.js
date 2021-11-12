import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Courses() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
    >
      <Typography>Här visas kurser</Typography>
    </Box>
  );
}
