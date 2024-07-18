import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../../Images/Luxi-Hosting-Logo.svg";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  // { label: "MentorFrom", path: "/mentorregister" },
  { label: "About  Team", path: "/about" },
  { label: "What We Do", path: "/" },
  { label: "Contact", path: "/" },
  { label: "Dashboard", path: "/" },
  // { label: "Donate", path: "/donate" },
  // { label: "MT", path: "/mentoradmin" },
  // { label: "ST", path: "/studentadmin" },
  // { label: "CT", path: "/categoryadmin" },
  // { label: "AT", path: "/admindata" },
  // { label: "F", path: "/finance" },
  // { label: "E", path: "/education" },
  // { label: "Ep", path: "/employment" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Project Artha
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton>
              {Array.isArray(item.submenus) ? (
                <Box>
                  <ListItemText primary={item.label} />
                  <List>
                    {item.submenus.map((submenu) => (
                      <ListItem key={submenu} disablePadding>
                        <ListItemButton>
                          <Link
                            to={`${item.path}/${submenu
                              .replace(/\s+/g, "-")
                              .toLowerCase()}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <ListItemText primary={submenu} />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={item.label} />
                </Link>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "75px" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#412C49" }}>
        <Toolbar className="toolbarContainer">
          {" "}
          {/* Add className */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} alt="logo" width={50} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 2,
              pr: 5,
              py: 2,
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: " Montserrat",

              // fontSize: 20,
              fontWeight: 700,
              // letterSpacing: ".1rem",
              fontSize: 40,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Gov Pramaan
          </Typography>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  margin: "3px",
                  "&:hover": {
                    color: "#FFA000",
                  },
                  fontFamily: " Montserrat",
                  fontWeight: "semibold",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Add this line to push the login button to the end */}
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              // border: "1px solid #482D2D",
              // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              // borderRadius: "20px",
              padding: "10px 20px",
              backgroundColor: "transparent",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#1F0954",
              },
              "&:focus": {
                outline: "none",
              },
              fontFamily: "Montserrat",
              fontWeight: "bold",
              mr: 2,
            }}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            sx={{
              backgroundColor: "transparent",
              color: "#fff",
              // border: "1px solid #482D2D",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              // borderRadius: "20px",
              padding: "10px 20px",
              backgroundColor: "#FFA000",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#1F0954",
              },
              "&:focus": {
                outline: "none",
              },
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
