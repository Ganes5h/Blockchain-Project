import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import myPhoto from "../../Images/Ganesh.jpg";

// Import MUI Icons
import BuildIcon from "@mui/icons-material/Build";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import LanguageIcon from "@mui/icons-material/Language";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import RouterIcon from "@mui/icons-material/Router";
import DevicesIcon from "@mui/icons-material/Devices";
import EmailIcon from "@mui/icons-material/Email";

// Background image style
const BackgroundContainer = styled(Container)(({ theme }) => ({
  backgroundImage:
    "url('https://images.unsplash.com/photo-1464639351491-a172c2aa2911?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  minHeight: "90vh",
}));

const FadeInContainer = styled(Box)({
  animation: "fadeIn 0.4s ease-in-out",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});

const ColorfulCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 15,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const AboutMe = () => {
  return (
    <BackgroundContainer
      maxWidth="xl"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      <FadeInContainer
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "50%",
        }}
      >
        <Box sx={{ flex: 1, textAlign: "center", width: "50%" }}>
          <Avatar
            alt="Niraj Vernekar"
            src={myPhoto}
            sx={{
              width: 180,
              height: 180,
              margin: "0 auto",
              mb: 3,
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5x;",
              //   border: "5px solid",
              borderColor: "primary.main",
            }}
          />
          <Typography variant="h3" gutterBottom sx={{ color: "white" }}>
            Ganesh Kugaji
          </Typography>
          <Typography variant="h6" color="white" paragraph>
            Enthusiastic Developer | Blockchain Enthusiast | MERN Stack
            Developer
          </Typography>
          <Box sx={{ flex: 2 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mt: 5, color: "secondary.main" }}
            >
              Tech Stack
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Chip
                  icon={<BuildIcon />}
                  label="Hardhat"
                  sx={{
                    bgcolor: "secondary.light",
                    color: "secondary.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<CodeIcon />}
                  label="Solidity"
                  sx={{ bgcolor: "error.light", color: "error.contrastText" }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<StorageIcon />}
                  label="Ganache"
                  sx={{
                    bgcolor: "warning.light",
                    color: "warning.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<LanguageIcon />}
                  label="Web3.js"
                  sx={{ bgcolor: "info.light", color: "info.contrastText" }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<AccountBalanceWalletIcon />}
                  label="Ether.js"
                  sx={{
                    bgcolor: "success.light",
                    color: "success.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<DeveloperBoardIcon />}
                  label="MongoDB"
                  sx={{
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<CodeOutlinedIcon />}
                  label="React"
                  sx={{
                    bgcolor: "secondary.light",
                    color: "secondary.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<RouterIcon />}
                  label="Express.js"
                  sx={{
                    bgcolor: "warning.light",
                    color: "warning.contrastText",
                  }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<DevicesIcon />}
                  label="Node.js"
                  sx={{ bgcolor: "info.light", color: "info.contrastText" }}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<EmailIcon />}
                  label="Nodemailer"
                  sx={{ bgcolor: "error.light", color: "error.contrastText" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </FadeInContainer>

      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 5, width: "50%" }}
      >
        <ColorfulCard sx={{ maxWidth: 700, p: 2 }}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Online Blockchain-Based Certificate Generation and Validation
              System
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              Currently, a large number of training programs are organized, and
              certificates are provided. However, there is no mechanism to
              validate digital certificates. To address this, I developed a
              system that generates custom digital certificates using blockchain
              technology. Users can store these certificates in a digital locker
              system, and other organizations can validate them. This project
              utilizes open-source software and blockchain technology to ensure
              the security and integrity of digital certificates.
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", mt: 2, fontWeight: "bold" }}
            >
              Expected Output: Blockchain-based certificate generation and
              validation, with certificates that can be added to a digital
              locker system.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "left", mt: 2 }}>
              <strong>Users:</strong> Government Offices, Students, Industries,
              Institutes.
            </Typography>
          </CardContent>
        </ColorfulCard>
      </Box>
    </BackgroundContainer>
  );
};

export default AboutMe;
