// import * as React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { logout } from "../../store/authSlice";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import Divider from "@mui/material/Divider";
// import LogoutIcon from "@mui/icons-material/Logout";

// const pages = ["What we do", "Contact", "Blog"];
// const routes = ["/what-we-do", "/contact", "/blog"];

// const ResponsiveAppBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     handleCloseUserMenu();
//   };

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   const getSectionPath = (role) => {
//     switch (role) {
//       case "student":
//         return "/student-section";
//       case "government":
//         return "/govt-section";
//       case "industry":
//         return "/industry-section";
//       case "institute":
//         return "/institute-section";
//       default:
//         return "#";
//     }
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             HOME
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem
//                   key={page}
//                   onClick={() => {
//                     handleNavigate(routes[index]);
//                     handleCloseNavMenu();
//                   }}
//                 >
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//               {isAuthenticated && user?.role && (
//                 <>
//                   <Divider />
//                   <MenuItem
//                     onClick={() => {
//                       handleNavigate(getSectionPath(user.role));
//                       handleCloseNavMenu();
//                     }}
//                   >
//                     <Typography textAlign="center">
//                       {getSectionPath(user.role)
//                         .split("/")[1]
//                         .replace("-", " ")}
//                     </Typography>
//                   </MenuItem>
//                 </>
//               )}
//             </Menu>
//           </Box>

//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             HOME
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page, index) => (
//               <Button
//                 key={page}
//                 onClick={() => handleNavigate(routes[index])}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {page}
//               </Button>
//             ))}
//             {isAuthenticated && user?.role && (
//               <Button
//                 onClick={() => handleNavigate(getSectionPath(user.role))}
//                 sx={{ my: 2, color: "white", display: "block" }}
//               >
//                 {getSectionPath(user.role).split("/")[1].replace("-", " ")}
//               </Button>
//             )}
//           </Box>

//           <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
//             {isAuthenticated ? (
//               <>
//                 <Typography sx={{ color: "white", mr: 2 }}>
//                   {user?.username || "User"}
//                 </Typography>
//                 <Button
//                   onClick={handleLogout}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   <Link to="/">
//                     <LogoutIcon />
//                   </Link>
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" style={{ textDecoration: "none" }}>
//                   <Button sx={{ color: "white" }}>Login</Button>
//                 </Link>
//                 <Link to="/signup" style={{ textDecoration: "none" }}>
//                   <Button sx={{ color: "white" }}>Sign Up</Button>
//                 </Link>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default ResponsiveAppBar;

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/authSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import MUILogo from "@mui/icons-material/Work";
import Dialog from "@mui/material/Dialog";
import Login from "../Authentication/Login";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Signup from "../Authentication/Signup";
import "react-perfect-scrollbar/dist/css/styles.css";

// Define separate arrays for pages and routes
const pages = ["What we do", "Contact", "About Me"];
const routes = ["/what-we-do", "/contact", "/about-us"];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleOpenSignupDialog = () => {
    setOpenSignupDialog(true);
  };

  const handleCloseSignupDialog = () => {
    setOpenSignupDialog(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getSectionPath = (role) => {
    switch (role) {
      case "student":
        return "/student-section";
      case "government":
        return "/govt-section";
      case "industry":
        return "/industry-section";
      case "institute":
        return "/institute-section";
      default:
        return "#";
    }
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#412C49",
        boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
        borderBottom: "2px solid white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleNavigate(routes[index]);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {isAuthenticated && user?.role && (
                <>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      handleNavigate(getSectionPath(user.role));
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">
                      {getSectionPath(user.role)
                        .split("/")[1]
                        .replace("-", " ")}
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={() => handleNavigate(routes[index])}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
            {isAuthenticated && user?.role && (
              <Button
                onClick={() => handleNavigate(getSectionPath(user.role))}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {getSectionPath(user.role).split("/")[1].replace("-", " ")}
              </Button>
            )}
          </Box>
          {/* <Box sx={{ flexGrow: 8, display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MUILogo sx={{ mr: 1 }} /> Secure Certify
            </Typography>
          </Box> */}

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {isAuthenticated ? (
              <>
                {/* <Typography
                  sx={{ color: "white", mr: 2 }}
                  style={{ fontSize: "bold" }}
                >
                  {user?.username || "User"}
                </Typography> */}
                <Typography
                  sx={{
                    color: "white",
                    mr: 2,
                    fontWeight: "bold",
                    flexGrow: 1,
                    textAlign: "right",
                    letterSpacing: "0.1rem",
                  }}
                >
                  {user?.username || "User"}
                  <span> from {user?.organization || "org"}</span>
                </Typography>

                <Button
                  onClick={handleLogout}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link to="/">
                    <LogoutIcon />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {/* <Link to="/login" style={{ textDecoration: "none" }}> */}
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={handleOpenLoginDialog}
                  // sx={{ color: "white" }}
                  sx={{
                    backgroundColor: "transparent",
                    color: "black",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "10px 20px",

                    backgroundColor: "white",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      backgroundColor: "#FFA000",
                      color: "#1F0954",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
                {/* </Link> */}
                {/* <Link to="/signup" style={{ textDecoration: "none" }}> */}
                <Button
                  onClick={handleOpenSignupDialog}
                  // sx={{ color: "white" }}
                  sx={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
                  Sign Up
                </Button>
                {/* </Link> */}
              </>
            )}
          </Box>
          <Dialog
            open={openLoginDialog}
            onClose={handleCloseLoginDialog}
            PaperProps={{
              style: { backdropFilter: "blur(10px)" }, // Apply blur to the background
            }}
            fullWidth
            maxWidth="sm"
          >
            <PerfectScrollbar className="dialog-scrollbar">
              <div className="dialog-content">
                <Login />
              </div>
            </PerfectScrollbar>
          </Dialog>

          <Dialog
            open={openSignupDialog}
            onClose={handleCloseSignupDialog}
            PaperProps={{
              style: { backdropFilter: "blur(10px)" }, // Apply blur to the background
            }}
            fullWidth
            maxWidth="sm"
          >
            <PerfectScrollbar className="dialog-scrollbar">
              <div className="dialog-content">
                <Signup />
              </div>
            </PerfectScrollbar>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
