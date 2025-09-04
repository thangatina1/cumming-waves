/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { BsCart2 } from "react-icons/bs";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />, 
      link: "/"
    },
    {
      text: "About",
      icon: <InfoIcon />, 
      link: "/about"
    },
    {
      text: "Event Calendar",
      icon: <CommentRoundedIcon />, 
      link: "/calendar"
    },
    {
      text: "Training Groups",
      icon: <PhoneRoundedIcon />, 
      link: "/training-groups"
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />, 
      link: "/contact"
    },
    {
      text: "Team Store",
      icon: <BsCart2 />, 
      link: "/team-store"
    },
    {
      text: "Payment",
      icon: <ShoppingCartRoundedIcon />, 
      link: "/payment"
    },
  ];
  return (
    <nav style={{
      background: '#fff',
      borderRadius: '1.2rem',
      boxShadow: '0 2px 12px #0077b61a',
      margin: '24px auto 32px auto',
      maxWidth: 1200,
      padding: '0 2.5rem',
      position: 'relative',
      minHeight: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 32
    }}>
      {/* Welcome ribbon like CoachHome/ParentHome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 320,
        marginRight: 32
      }}>
        <img src={Logo} alt="Logo" style={{ width: 60, height: 60, borderRadius: '50%', border: '2.5px solid #0077b6', boxShadow: '0 2px 8px #0077b61a', marginRight: 18, background: '#fff' }} />
        <h2 className="primary-heading" style={{
          margin: 0,
          fontWeight: 700,
          fontSize: '1.35rem',
          color: '#0077b6',
          background: 'linear-gradient(90deg, #e0f7fa 60%, #fff 100%)',
          padding: '0.5rem 1.5rem 0.5rem 1rem',
          borderRadius: '1.2rem',
          boxShadow: '0 2px 8px #0077b61a',
          letterSpacing: 1
        }}>Cumming Waves Swim Team</h2>
      </div>
      <div className="navbar-links-container" style={{flex: 1, display: 'flex', alignItems: 'center', gap: 24}}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/calendar">Event Calendar</Link>
        <Link to="/training-groups">Training Groups</Link>
        <Link to="/contact">Our Location</Link>
        <Link to="/team-store">Team Store</Link>
        <Link to="/admin-login">
          <MdAdminPanelSettings className="navbar-cart-icon" title="Admin Login" style={{fontSize:'1.5rem'}} />
        </Link>
        <Link to="/login" className="primary-button" style={{textDecoration: 'none', marginLeft: 18}}>Parent Login</Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
