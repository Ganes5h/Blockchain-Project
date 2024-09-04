import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Badge,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast, Toaster } from "sonner";

const StyledCard = styled(Card)({
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  textAlign: "center",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
});

const VerificationStatus = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    // toast.success(`Navigating to ${path} section`);
    navigate(path);
  };

  // Number of pending verifications for the badge
  const pendingVerificationCount = 8;

  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center" mt={8}>
        Verification Status
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={4}>
        {/* Pending Verification Card */}
        <Grid item xs={12} md={4}>
          <Badge
            badgeContent={pendingVerificationCount}
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <StyledCard
              sx={{ backgroundColor: "#FFC107", color: "black" }}
              onClick={() => handleCardClick("/secure/certify/admin/pending")}
            >
              <CardContent>
                <Typography variant="h5">Pending Verification</Typography>
              </CardContent>
            </StyledCard>
          </Badge>
        </Grid>
        {/* Approved Verification Card */}
        <Grid item xs={12} md={4}>
          <StyledCard
            sx={{ backgroundColor: "#4CAF50", color: "white" }}
            onClick={() => handleCardClick("/secure/certify/admin/approved")}
          >
            <CardContent>
              <Typography variant="h5">Approved Verification</Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Rejected Verification Card */}
        <Grid item xs={12} md={4}>
          <StyledCard
            sx={{ backgroundColor: "#F44336", color: "white" }}
            onClick={() => handleCardClick("/secure/certify/admin/rejected")}
          >
            <CardContent>
              <Typography variant="h5">Rejected Verification</Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <Toaster position="top-right" />
    </Container>
  );
};

export default VerificationStatus;
