import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Home() {
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
        <AppBar>
          <Toolbar>
            <IconButton
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
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
              'aria-labelledby': 'basic-button',
              }}
            >
              <Link href='/'>
                <MenuItem onClick={handleClose}>Hem</MenuItem>
              </Link>
              <Link href='/courses'>
                <MenuItem onClick={handleClose}>Kurser</MenuItem>
              </Link>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Superhäftig skola
            </Typography>
            <Link href='/login'>
                <Button color="inherit">Logga in</Button>
            </Link>
            <Link href='/register'>
                <Button color="inherit">Registrera</Button>
            </Link>                          
          </Toolbar>
        </AppBar>
      </Box>
  )
}