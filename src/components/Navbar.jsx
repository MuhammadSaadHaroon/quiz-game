import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../logo/logo.png';
import '../styles/Navbar.css';

export default function Navbar(){
  return (
    <AppBar position="static" className="navbar-appbar">
      <Toolbar className="navbar-toolbar">

        {/* SVG Logo + Title */}
        <div className="navbar-brand">
          <img src={Logo} alt="Quiz Logo" className="navbar-logo" />
          <Typography variant="h6" className="navbar-title">
            Quiz Game
          </Typography>
        </div>

        {/* Menu Buttons */}
        <Button className="navbar-btn" component={Link} to="/">Home</Button>
      </Toolbar>
    </AppBar>
  );
}
