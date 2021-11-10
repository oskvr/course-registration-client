import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}
    >
      <Box>
        <Box
          //Custom CSS inline
          sx={{
            padding: "50px",
            boxShadow: 1,
            background: "hsl(220, 50%, 50%)",
            color: "white",
            transition: "0.2s",
            "&:hover": {
              background: "hsl(220, 50%, 40%)",
              transform: "translateY(-5px)",
              boxShadow: 10,
            },
          }}
        >
          <Typography>Course Registration App</Typography>
        </Box>
      </Box>
    </Box>
  );
}
