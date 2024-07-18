// import "minireset.css";
// import "./Certificate_4.css";

// function App({ name, course, date }) {
//   return (
//     <div className="App">
//       <Icon />
//       <p className="byline">Certificate of completion</p>

//       <div className="content">
//         <p>Awarded to</p>
//         <h1>{name}</h1>
//         <p>for completing:</p>
//         <h2>{course}</h2>
//       </div>

//       {date && (
//         <p className="date">
//           Issued on <span className="bold">{date}</span>
//         </p>
//       )}
//     </div>
//   );
// }

// App.defaultProps = {
//   name: "James Lee",
//   course: "Creating PDFs with React & Make.cm",
//   date: "March 15 2021",
// };

// const Icon = () => (
//   <svg
//     width="99"
//     height="139"
//     viewBox="0 0 99 139"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M0 0H99V138.406L52.1955 118.324L0 138.406V0Z" fill="white" />
//     <path
//       d="M25.4912 83.2515C25.4912 79.4116 27.0222 75.7289 29.7474 73.0137C32.4727 70.2985 36.1689 68.7731 40.0229 68.7731C43.877 68.7731 47.5732 70.2985 50.2984 73.0137C53.0236 75.7289 54.5546 79.4116 54.5546 83.2515M40.0229 59.724C40.0229 55.8841 41.5539 52.2014 44.2791 49.4862C47.0044 46.7709 50.7006 45.2455 54.5546 45.2455C58.4087 45.2455 62.1049 46.7709 64.8301 49.4862C67.5553 52.2014 69.0863 55.8841 69.0863 59.724V83.2515"
//       stroke="#0379FF"
//       strokeWidth="10.6193"
//     />
//   </svg>
// );

// export default App;

import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

const CertificateTemplate = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Paper
        elevation={3}
        style={{
          maxWidth: 800,
          margin: "auto",
          padding: 16,
          backgroundColor: "#ffefd5", // Light cream background for the certificate
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#7c4dff" }}
            >
              Certificate of Completion
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="center"
              style={{ color: "#555" }}
            >
              This certificate is awarded to
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              align="center"
              style={{ fontWeight: "bold", color: "#ff7f50" }}
            >
              [Recipient's Name]
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="center"
              style={{ color: "#555" }}
            >
              For successfully completing the course
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="center"
              style={{ fontWeight: "bold", color: "#4dd0e1" }}
            >
              [Course Name]
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Box>
                <Typography variant="body2" style={{ color: "#888" }}>
                  Issued on:
                </Typography>
                <Typography variant="body1" style={{ color: "#555" }}>
                  [Issue Date]
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" style={{ color: "#888" }}>
                  Certificate ID:
                </Typography>
                <Typography variant="body1" style={{ color: "#555" }}>
                  [Certificate ID]
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" mt={4}>
              <Box
                component="img"
                src="[Company Logo URL]"
                alt="Company Logo"
                style={{ maxWidth: "200px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CertificateTemplate;
