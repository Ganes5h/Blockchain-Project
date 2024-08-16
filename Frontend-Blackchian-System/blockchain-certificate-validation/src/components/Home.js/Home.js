import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Grid, Typography, Button } from "@mui/material";
import SecurityImg from "../../Images/security1.svg";
import theme from "../../theme";
// import BackImage from "";
import { ThemeProvider } from "@mui/material/styles";
import Feature1 from "../../Images/Feature1.svg";
import Feature2 from "../../Images/Feature2.svg";
import Feature3 from "../../Images/Feature3.svg";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
function LandingPage() {
  const backgroundImageUrl = "url('../../Images/Benefit.svg')";
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="">
          {/* <Navbar /> */}
          <div
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              alignItems: "center",
            }}
          >
            <div class="">
              <Grid container sx={{ backgroundColor: "#412C49" }}>
                <Grid sm={12} md={7} sx={{ pl: 8 }}>
                  <div class="container mx-auto flex lg:px-12 py-24 lg:mt-2 md:flex-row flex-col items-center my-10 px-4">
                    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                          pr: 5,
                          py: 2,
                          flexGrow: 1,
                          display: { xs: "none", sm: "block" },
                          fontWeight: 700,
                          fontSize: 70,
                          color: "inherit",
                          textDecoration: "none",
                          fontStyle: "italic",
                          color: "white",
                        }}
                      >
                        Secure Certify
                      </Typography>
                      <h1 class="md:text-4xl text-3xl text-white mb-4 font-bold font-montserrat text-gray-900">
                        Trust in Every Credential
                      </h1>
                      <p class="mb-8 leading-relaxed text-white font-montserrat">
                        Welcome to Secure Certify, a blockchain-based solution
                        for generating and validating digital certificates.
                        Designed for government offices, students, industries,
                        and educational institutes, our platform creates unique,
                        verifiable certificates securely stored in a digital
                        locker. This ensures authenticity and simplifies the
                        validation process for third parties.
                      </p>
                      <div class="flex justify-center">
                        <button class="inline-flex font-bold text-white bg-[#9C27B0] border-0 py-2 px-6 focus:outline-none hover:bg-[#7B1FA2]  shadow-lg">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid sm={12} md={5} sx={{ pr: 12, pt: 12 }}>
                  <div className="">
                    <img src={SecurityImg} alt="Security" />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div
          className="landing-sec min-h-screen container"
          style={{
            backgroundImage: backgroundImageUrl,
            backgroundSize: "cover", // Ensure the image covers the entire area
            backgroundPosition: "center", // Center the image
            height: "100vh", // Adjust the height as needed
            width: "100%", // Adjust the width as needed
          }}
        >
          <Grid container>
            <Grid md={6} className="mt-12 p-2">
              <Typography
                variant="h2"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Secure and Verifiable
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff", ml: 14, mt: 2 }}>
                Our blockchain-based system ensures the highest level of
                security and authenticity, making certificate forgery a thing of
                the past.
              </Typography>
            </Grid>
            <Grid md={6}>
              <div className="flex flex-row my-8 ml-44">
                <img src={Feature1} alt="Feature1" />
              </div>
            </Grid>
            <Grid md={6}>
              <div className="ml-12">
                <img src={Feature2} alt="Feature2" />
              </div>
            </Grid>
            <Grid md={6}>
              <Typography
                variant="h2"
                sx={{ color: "#fff", fontWeight: "bold" }}
              >
                Easy Access
              </Typography>
              <Typography variant="h5" sx={{ color: "#fff", ml: 14, mt: 2 }}>
                Store and access your certificates in a secure digital locker,
                available anytime, anywhere.
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div className="min-h-screen bg-[#412C49]">
          <Grid container>
            <Grid md={5}>
              <div className="pl-32 pt-8">
                <img src={Feature3} alt="Feature3" />
              </div>
            </Grid>
            <Grid container md={7}>
              <Grid
                md={5}
                className="mt-12 bg-[#424242] mx-6"
                sx={{
                  color: "#fff",
                  border: "4px solid #9C27B0",
                  borderRadius: "20px",
                  p: 4,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", my: 4 }}>
                  Government Offices
                </Typography>
                <Typography variant="h6">
                  Streamline the issuance and validation of certificates with
                  our secure, blockchain-based solution.
                </Typography>
              </Grid>
              <Grid
                md={5}
                className="mt-12 bg-[#424242] mx-6"
                sx={{
                  color: "#fff",
                  border: "4px solid #9C27B0",
                  borderRadius: "20px",
                  p: 4,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", my: 4 }}>
                  Educational Institutes
                </Typography>
                <Typography variant="h6">
                  Issue digital certificates that are instantly verifiable and
                  tamper-proof.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              md={12}
              sx={{ mt: 12, color: "#fff" }}
              className="text-center"
            >
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 8 }}>
                Revolutionizing Certification for a Digital World
              </Typography>
              <Button
                color="inherit"
                component={Link}
                to="/"
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
                Sign up
              </Button>
            </Grid>
          </Grid>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default LandingPage;
