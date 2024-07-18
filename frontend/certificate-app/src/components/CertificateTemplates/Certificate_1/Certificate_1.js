import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Certificate_1.css";

const Certificate_1 = ({ recipient, course, date }) => {
  return (
    <Paper style={{ width: "100%" }} className="certificate1">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <CheckCircleIcon className="icon1" />
        <Typography variant="h2" className="title1">
          Certificate of Completion
        </Typography>
        <Typography variant="h5" className="subtitle1">
          This certificate is proudly presented to
        </Typography>
        <Typography variant="h3" className="name1">
          {recipient}
        </Typography>
        <Typography variant="h5" className="subtitle1">
          For successfully completing the
        </Typography>
        <Typography variant="h4" className="course1">
          {course}
        </Typography>
        <Typography variant="h6" className="text1">
          on {date}
        </Typography>
        <Grid container spacing={3} className="footer1">
          <Grid item xs={6}>
            <Typography variant="h6" className="text1">
              Signature
            </Typography>
            <Typography variant="body1" className="text1">
              _________________________
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" className="text1">
              Date
            </Typography>
            <Typography variant="body1" className="text1">
              _________________________
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Certificate_1;
