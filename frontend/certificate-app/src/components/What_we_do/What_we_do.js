import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import GenerateCertificate from "../../Images/Generate_certi.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const WhatWeDo = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundColor: "#412C49",
          color: "white",
          minHeight: "100vh",
          padding: "64px 0", // Equal to theme.spacing(8, 0)
        }}
      >
        <Container>
          <Typography
            variant="h3"
            align="center"
            style={{
              fontWeight: "bold",
              marginBottom: "32px", // Equal to theme.spacing(4)
            }}
          >
            What We Do
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            We provide a secure, blockchain-based certificate generation and
            validation system for government organizations. Our platform ensures
            the authenticity of digital certificates and allows users to store
            and validate them seamlessly.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <CardMedia
                  style={{
                    height: 180,
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                  image={GenerateCertificate}
                  title="Certificate Generation"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    Certificate Generation
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Create custom digital certificates using our platform. We
                    ensure every certificate is securely stored on the
                    blockchain, preventing forgery and ensuring authenticity.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <CardMedia
                  style={{ height: 180 }}
                  image="https://www.zinghr.com/wp-content/uploads/2020/09/218-7-1-1.jpg"
                  title="Digital Locker System"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    Digital Locker System
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Store your certificates in a secure digital locker. Easily
                    access and manage your certificates whenever you need them.
                    manage your certificates whenever you need them.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              >
                <CardMedia
                  style={{ height: 180 }}
                  image="https://cryptosoftwares.com/wp-content/uploads/2022/11/Document-and-Certificate-Verification-Through-Blockchain-Technology.jpeg"
                  title="Certificate Validation"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    Certificate Validation
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Validate certificates with ease using our platform. Other
                    organizations can verify the authenticity of certificates
                    quickly and securely.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default WhatWeDo;
