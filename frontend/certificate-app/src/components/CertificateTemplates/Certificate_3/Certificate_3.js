import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import "./Certificate_3.css";

const Certificate_3 = ({ recipient, course, date }) => {
  return (
    <Paper style={{ width: "100%" }} className="certificate3">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <StarsIcon className="header-icon3" />
        <Typography variant="h2" className="title3">
          Certificate of Achievement
        </Typography>
        <Typography variant="h5" className="subtitle3">
          This is to certify that
        </Typography>
        <Typography variant="h3" className="recipient3">
          {recipient}
        </Typography>
        <Typography variant="h5" className="description3">
          Has been awarded for outstanding performance in
        </Typography>
        <Typography variant="h4" className="course-name3">
          {course}
        </Typography>
        <Typography variant="h6" className="date3">
          Dated: {date}
        </Typography>
        <div className="footer3">
          <div>
            <Typography variant="h6" className="footer-text3">
              Instructor's Signature
            </Typography>
            <Typography variant="body1" className="footer-text3">
              _________________________
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="footer-text3">
              Date
            </Typography>
            <Typography variant="body1" className="footer-text3">
              _________________________
            </Typography>
          </div>
        </div>
      </Box>
    </Paper>
  );
};

export default Certificate_3;

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
// } from "@mui/material";
// import StarsIcon from "@mui/icons-material/Stars";
// import "./Certificate_3.css";

// const Certificate_3 = () => {
//   const [openDialog, setOpenDialog] = useState(false);

//   const handlePreview = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <div className="certificate-container3">
//       <Paper elevation={3} className="certificate3">
//         <Box
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <StarsIcon className="header-icon3" />
//           <Typography variant="h2" className="title3">
//             Certificate of Achievement
//           </Typography>
//           <Typography variant="h5" className="subtitle3">
//             This is to certify that
//           </Typography>
//           <Typography variant="h3" className="recipient3">
//             John Doe
//           </Typography>
//           <Typography variant="h5" className="description3">
//             Has been awarded for outstanding performance in
//           </Typography>
//           <Typography variant="h4" className="course-name3">
//             Graphic Design
//           </Typography>
//           <Typography variant="h6" className="date3">
//             Dated: October 15, 2024
//           </Typography>
//           <div className="footer3">
//             <div>
//               <Typography variant="h6" className="footer-text3">
//                 Instructor's Signature
//               </Typography>
//               <Typography variant="body1" className="footer-text3">
//                 _________________________
//               </Typography>
//             </div>
//             <div>
//               <Typography variant="h6" className="footer-text3">
//                 Date
//               </Typography>
//               <Typography variant="body1" className="footer-text3">
//                 _________________________
//               </Typography>
//             </div>
//           </div>
//           <Button
//             onClick={handlePreview}
//             variant="contained"
//             color="primary"
//             disabled={false} // Update this with your condition to enable/disable the button
//             sx={{ mt: 2, borderRadius: "12px" }}
//           >
//             Preview
//           </Button>
//           <Dialog open={openDialog} onClose={handleCloseDialog}>
//             <DialogTitle>Certificate Template Preview</DialogTitle>
//             <DialogContent>
//               Okay
//               {/* Add your certificate template preview here */}
//               {/* Example: <img src={certificateTemplateImage} alt="Certificate Template" /> */}
//             </DialogContent>
//           </Dialog>
//         </Box>
//       </Paper>
//     </div>
//   );
// };

// export default Certificate_3;
