import { CastForEducation, School } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import Link from "./Link";
import NextLink from "next/link";

let linkId = 0;
const LEFT_LINKS = [
  { id: linkId++, href: "/", text: "Hem" },
  { id: linkId++, href: "/courses", text: "Kurser" },
];

const RIGHT_LINKS = [
  { id: linkId++, href: "/account/login", text: "Logga in" },
  { id: linkId++, href: "/account/register", text: "Registrera" },
];

const ALL_LINKS = LEFT_LINKS.concat(RIGHT_LINKS);

export default function Navbar() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <>
      <Box hidden={isMobile}>
        <MobileNavbar />
      </Box>
      <Box hidden={!isMobile}>
        <DesktopNavbar />
      </Box>
    </>
  );
}

function DesktopNavbar() {
  return (
    <AppBar variant="outlined" position="relative" sx={{ border: "none" }}>
      <Toolbar>
        <SiteLogo />
        {LEFT_LINKS.map((link) => (
          <NavLink href={link.href} key={link.id}>
            {link.text}
          </NavLink>
        ))}
        <Box flex="1" />
        {RIGHT_LINKS.map((link) => (
          <NavLink href={link.href} key={link.id}>
            {link.text}
          </NavLink>
        ))}
      </Toolbar>
    </AppBar>
  );
}
function MobileNavbar() {
  const [showMenu, setShowMenu] = React.useState(false);
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
          top: "50",
          left: "0",
          height: "95vh",
          width: "100%",
          background: "white",
          zIndex: "9999",
          display: { base: "block", md: "none" },
        }}
        in={showMenu}
      >
        <Box backgroundColor="white">
          <List>
            {ALL_LINKS.map((link) => (
              <ListItem key={link.id} disablePadding>
                <NextLink href={link.href}>
                  <ListItemButton
                    sx={{ fontSize: 18 }}
                    onClick={() => setShowMenu(false)}
                  >
                    {link.text}
                  </ListItemButton>
                </NextLink>
              </ListItem>
            ))}
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
