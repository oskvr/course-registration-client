import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Box } from "@mui/system";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        // backgroundImage: `url("/wallpaper.jpg")`,
        // height: "100%",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover"
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
