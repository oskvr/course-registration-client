import School from "@mui/icons-material/School";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useRouter } from "next/dist/client/router";
import Link from "./Link";
import NextLink from "next/link";
import { useAuth } from "@/lib/auth";

export default function Navbar() {
  const { isMobile } = useNavbar();
  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
}
function useNavbar() {
  const { onLogout, isLoggedIn, user } = useAuth();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const router = useRouter();
  function handleLogout() {
    onLogout();
    router.push("/");
  }

  return { handleLogout, isLoggedIn, isMobile, user};
}
function DesktopNavbar() {
  // const { user } = useAuth();
  const { isLoggedIn, handleLogout, user } = useNavbar();
  return (
    <AppBar
      variant="outlined"
      elevation={0}
      position="relative"
      sx={{ border: "none" }}
    >
      <Toolbar>
        <SiteLogo />
        <NavLink href="/">Hem</NavLink>
        <NavLink href="/courses">Kurser</NavLink>
        <Box flex="1" />
        {isLoggedIn ? (
          <>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {user? user.firstName.charAt(0) : ""}{user?  user.lastName.charAt(0) : ""}
            </Avatar>
            <NavLink href="/account">Mitt konto</NavLink>
            <Button variant="text" color="inherit" onClick={handleLogout}>
              Logga ut
            </Button>
          </>
        ) : (
          <>
            <NavLink href="/account/login">Logga in</NavLink>
            <NavLink href="/account/register">Registrera</NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
function MobileNavbar() {
  const [showMenu, setShowMenu] = React.useState(false);
  const { isLoggedIn, handleLogout } = useNavbar();
  function ListLink({ href, text }) {
    return (
      <ListItem disablePadding>
        <NextLink href={href}>
          <ListItemButton onClick={() => setShowMenu(false)}>
            {text}
          </ListItemButton>
        </NextLink>
      </ListItem>
    );
  }
  return (
    <>
      <AppBar variant="outlined" position="relative" sx={{ border: "none" }}>
        <Toolbar>
          <SiteLogo />
          <Box flex="1" />
          <IconButton
            id="mobile-button"
            aria-controls="mobile-menu"
            aria-expanded={showMenu ? "true" : undefined}
            onClick={() => setShowMenu(!showMenu)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Fade
        unmountOnExit
        sx={{
          position: "absolute",
          top: "62px",
          left: "0",
          height: "95vh",
          width: "100%",
          background: "white",
          zIndex: "9999",
          display: { md: "none" },
        }}
        in={showMenu}
      >
        <Box backgroundColor="white">
          <List>
            <ListLink href="/" text="Hem" />
            <ListLink href="/courses" text="Kurser" />
            {isLoggedIn ? (
              <>                
                <ListLink href="/account" text="Mitt konto" />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                  >
                    Logga ut
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListLink href="/account/login" text="Logga in" />
                <ListLink href="/account/register" text="Registrera" />
              </>
            )}
          </List>
        </Box>
      </Fade>
    </>
  );
}

function NavLink({ href, children }) {
  const pathname = typeof href === "string" ? href : href.pathname;
  const router = useRouter();
  return (
    <Link
      href={href}
      color="inherit"
      sx={{
        display: "inline-block",
        opacity: router.pathname === pathname ? 1 : 0.8,
        height: "100%",
        paddingX: "1rem",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      {children}
    </Link>
  );
}

function SiteLogo() {
  return (
    <Typography
      component={Link}
      variant="h5"
      href="/"
      color="inherit"
      pr={5}
      sx={{
        "&:hover": {
          "& .icon": {
            transform: "translateX(2px)",
          },
        },
      }}
    >
      <Typography
        component="span"
        display={{ xs: "none", sm: "inline" }}
        variant="inherit"
      >
        Superhäftig skola
      </Typography>
      <Box
        className="icon"
        component="span"
        sx={{ transition: "0.2s", display: "inline-block" }}
      >
        <School />
      </Box>
    </Typography>
  );
}
