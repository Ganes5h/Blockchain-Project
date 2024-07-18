import React from "react";
// import backGroundImage from "../../Images/BackgroundImage.svg";
import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import HomeIcon from "@mui/icons-material/Home";

function RegisterPage() {
  return (
    <div
      style={{
        // backgroundImage: `url(${backGroundImage})`,
        backgroundColor: "rgb(34 102 153)",
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <Box
          width="100%"
          height="50px"
          //   border="1px solid red"
          borderRadius="50px"
          display="flex"
          alignItems="center"
          justifyContent="end"
          padding="10px"
        >
          {/* Rounded Button using MUI */}
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                marginTop: "15px",
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              <HomeIcon />
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="contained"
              //   color="success"
              sx={{ borderRadius: "50px", marginRight: "10px", width: "110px" }}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="contained"
              //   color="success"
              sx={{ borderRadius: "50px" }}
            >
              Register
            </Button>
          </Link>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          //   width: "499px",
          height: "80vh",
          flexDirection: "row",
          //   border: "1px solid red",
        }}
      >
        <div
          style={{
            marginTop: "30px",
            // border: "1px solid black"
          }}
        >
          <img src={logo} width={500} alt="logo" />
        </div>
        {/* HEading */}

        <div
          style={{
            position: "relative",
            bottom: "50px",

            // border: "1px solid white",
            width: "500px",
            height: "300px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              //   border: "1px solid black",
            }}
          >
            <img src={logo} width={70} alt="logo" />
            <h1
              style={{
                color: "white",
                fontSize: "60px",
                paddingLeft: "40px",
                fontFamily: "Dancing Script",
                fontOpticalSizing: "auto",
              }}
            >
              GovPramaan
            </h1>
          </div>
          <div>
            <Link to="/government_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Governement Registration
              </Button>
            </Link>
            <Link to="/student_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Student Registration
              </Button>
            </Link>
            <Link to="/institute_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Institute Registration
              </Button>
            </Link>
            <Link to="/industry_register">
              <Button
                variant="contained"
                // color="success"
                fullWidth
                sx={{
                  mt: 6,
                  height: "40px",
                  borderRadius: "20px",
                  backgroundColor: "#1C8ADB",
                }}
              >
                Industry Registration
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
