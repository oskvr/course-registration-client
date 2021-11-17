import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: "1" }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
