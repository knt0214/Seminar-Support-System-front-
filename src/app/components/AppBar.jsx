'use client'

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function ButtonAppBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [['Attendance', '/attendance'], ['Articles', '/articles'], ['Chat', '/chat']];

  return (
    <div>
      <AppBar position="fixed" sx={{ background: 'transparent', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)', width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" >
              Web-App
            </Link>
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link key={item[0]} href={item[1]}>
                <Button key={item[0]} sx={{ color: 'black' }}>
                  {item[0]}
                </Button>
              </Link>
            ))}
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {menuOpen && (
        <div sx={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          <List component="nav" aria-label="mailbox folders" >
            <ListItem >
              <Link href='/attendance'>Attendance</Link>
            </ListItem>
            <Divider />
            <ListItem >
              <Link href='/articles'>Articles</Link>
            </ListItem>
            <Divider />
            <ListItem >
              <Link href='/chat'>Chat</Link>
            </ListItem>
            <Divider light />
          </List>
        </div>
      )}
    </div>
  );
}
