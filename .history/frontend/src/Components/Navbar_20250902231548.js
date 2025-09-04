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
      text: "Payment",
      icon: <ShoppingCartRoundedIcon />, 
      link: "/payment"
    },
  ];
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" />
      </div>
      <div className="navbar-links-container">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/calendar">Event Calendar</Link>
        <Link to="/training-groups">Training Groups</Link>
        <Link to="/contact">Find our Location</Link>
        <Link to="/admin-login">
          <MdAdminPanelSettings className="navbar-cart-icon" title="Admin Login" style={{fontSize:'1.5rem'}} />
        </Link>
  <Link to="/login" className="primary-button" style={{textDecoration: 'none'}}>Parent Login</Link>
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
