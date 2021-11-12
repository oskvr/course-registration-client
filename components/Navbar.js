import MenuIcon from "@mui/icons-material/Menu";
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
export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar variant="outlined">
        <Toolbar>
          <IconButton
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem component={Link} href="/" onClick={handleClose}>
              Hem
            </MenuItem>
            <MenuItem component={Link} href="/courses" onClick={handleClose}>
              Kurser
            </MenuItem>
          </Menu>
          <Typography
            component={Link}
            href="/"
            color="white"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Superhäftig skola
          </Typography>
          <NavLink href="/account/login">Logga in</NavLink>
          <NavLink href="/account/register">Registrera</NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function NavLink({ href, children }) {
  const pathname = typeof href === "string" ? href : href.pathname;
  const router = useRouter();
  console.log(router.pathname);
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
