import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./Certificate_2.css";

const Certificate_2 = ({ recipient, course, date }) => {
  return (
    <Paper style={{ width: "100%" }} className="certificate">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <EmojiEventsIcon className="header-icon" />
        <Typography variant="h2" className="title">
          Certificate of Excellence
        </Typography>
        <Typography variant="h5" className="subtitle">
          This is to certify that
        </Typography>
        <Typography variant="h3" className="recipient">
          {recipient}
        </Typography>
        <Typography variant="h5" className="description">
          Has successfully completed the course
        </Typography>
        <Typography variant="h4" className="course-name">
          {course}
        </Typography>
        <Typography variant="h6" className="date">
          Dated: {date}
        </Typography>
        <div className="footer">
          <div>
            <Typography variant="h6" className="footer-text">
              Instructor's Signature
            </Typography>
            <Typography variant="body1" className="footer-text">
              _________________________
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="footer-text">
              Date
            </Typography>
            <Typography variant="body1" className="footer-text">
              _________________________
            </Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default Certificate_2;
