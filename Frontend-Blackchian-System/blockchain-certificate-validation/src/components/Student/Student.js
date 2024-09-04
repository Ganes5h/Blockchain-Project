import React from "react";
import { Card, CardContent, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AllOutIcon from "@mui/icons-material/AllOut"; // Example icon
import BadgeIcon from "@mui/icons-material/Badge"; // Example icon
import LockIcon from "@mui/icons-material/Lock"; // Example icon
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// Styled card with scaling animation on hover
const AnimatedCard = styled(Card)(({ theme }) => ({
  width: "300px", // Increased width
  height: "200px", // Increased height
  margin: "16px",
  transition: "transform 0.3s ease-in-out", // Smooth scaling transition
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column", // Align content vertically
  "&:hover": {
    transform: "scale(1.1)", // Scale up on hover
  },
}));

const CardIcon = styled("div")(({ theme }) => ({
  fontSize: "70px", // Increased icon size
  marginBottom: "16px",
}));

const CardHeading = styled("div")(({ theme }) => ({
  fontSize: "20px", // Increased font size for card headings
  fontWeight: "bold",
}));

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "85vh",
}));

const CardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap",
  // maxWidth: "900px",
}));

const CardRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  flexWrap: "wrap",
}));

function Govt() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container
      style={{
        background: "#0f0c29 ",
        background:
          "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        height: "89.5vh",
      }}
    >
      <CardContainer>
        <CardRow>
          {/* <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/issue-certificate")}
            >
              <CardIcon>
                <AddCircleIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>Issue Certificate</CardHeading>
            </div>
          </AnimatedCard> */}
          <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/all-certificates")}
            >
              <CardIcon>
                <FileCopyIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>All Certificates</CardHeading>
            </div>
          </AnimatedCard>

          {/* <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/issued-certificates")}
            >
              <CardIcon>
                <BadgeIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>Your Issued Certificates</CardHeading>
            </div>
          </AnimatedCard> */}
          {/* </CardRow>

        <CardRow> */}
          <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/digilocker")}
            >
              <CardIcon>
                <LockIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>DigiLocker</CardHeading>
            </div>
          </AnimatedCard>
          {/* <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/revoke-certificates")}
            >
              <CardIcon>
                <CancelIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>Revoke Certificate</CardHeading>
            </div>
          </AnimatedCard> */}
          <AnimatedCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate("/validate-certificates")}
            >
              <CardIcon>
                <CheckCircleIcon style={{ fontSize: "60px" }} />
              </CardIcon>
              <CardHeading>Validate Your Certificate</CardHeading>
            </div>
          </AnimatedCard>
        </CardRow>
      </CardContainer>
    </Container>
  );
}

export default Govt;
