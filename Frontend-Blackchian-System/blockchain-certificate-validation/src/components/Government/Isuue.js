// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { TextField, Button, Grid, IconButton } from "@mui/material";
// import {
//   School as SchoolIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";

// const IssueCertificate = () => {
//   const [studentName, setStudentName] = useState("");
//   const [courseName, setCourseName] = useState("");
//   const [issuerName, setIssuerName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const token = useSelector((state) => state.auth.token); // Get token from Redux store
//   const handleSubmit = async () => {
//     if (!studentName || !courseName || !issuerName || !studentEmail) {
//       Swal.fire({
//         title: "Missing Information",
//         text: "Please fill all required fields.",
//         icon: "warning",
//       });
//       return;
//     }

//     Swal.fire({
//       title: "Confirm Issuance",
//       text: `Are you sure you want to issue a certificate to ${studentName} for ${courseName}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Issue Certificate",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/certificates/issue",
//             {
//               studentName,
//               courseName,
//               issuerName,
//               studentEmail,
//             },
//             {
//               headers: {
//                 authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           Swal.fire({
//             title: "Success",
//             text: `Certificate issued successfully!`,
//             icon: "success",
//           });
//           // Clear fields
//           setStudentName("");
//           setCourseName("");
//           setIssuerName("");
//           setStudentEmail("");
//         } catch (error) {
//           Swal.fire({
//             title: "Error",
//             text: `Failed to issue certificate: ${
//               error.response?.data?.message || error.message
//             }`,
//             icon: "error",
//           });
//         } finally {
//           setLoading(false);
//         }
//       }
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Issue Certificate</h2>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Student Name"
//             variant="outlined"
//             fullWidth
//             value={studentName}
//             onChange={(e) => setStudentName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <PersonIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Course Name"
//             variant="outlined"
//             fullWidth
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <SchoolIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Issuer Name"
//             variant="outlined"
//             fullWidth
//             value={issuerName}
//             onChange={(e) => setIssuerName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <PersonIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Student Email"
//             variant="outlined"
//             fullWidth
//             value={studentEmail}
//             onChange={(e) => setStudentEmail(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <EmailIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Issuing..." : "Issue Certificate"}
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default IssueCertificate;

// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   TextField,
//   Button,
//   Grid,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import {
//   School as SchoolIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";

// const IssueCertificate = () => {
//   const [studentName, setStudentName] = useState("");
//   const [courseName, setCourseName] = useState("");
//   const [issuerName, setIssuerName] = useState("");
//   const [studentEmail, setStudentEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const token = useSelector((state) => state.auth.token); // Get token from Redux store

//   const handleSubmit = async () => {
//     if (!studentName || !courseName || !issuerName || !studentEmail) {
//       Swal.fire({
//         title: "Missing Information",
//         text: "Please fill all required fields.",
//         icon: "warning",
//       });
//       return;
//     }

//     Swal.fire({
//       title: "Confirm Issuance",
//       text: `Are you sure you want to issue a certificate to ${studentName} for ${courseName}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Issue Certificate",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setLoading(true);
//         try {
//           const response = await axios.post(
//             "http://localhost:4000/api/certificates/issue",
//             {
//               studentName,
//               courseName,
//               issuerName,
//               studentEmail,
//             },
//             {
//               headers: {
//                 authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           Swal.fire({
//             title: "Success",
//             text: `Certificate issued successfully!`,
//             icon: "success",
//           });
//           // Clear fields
//           setStudentName("");
//           setCourseName("");
//           setIssuerName("");
//           setStudentEmail("");
//         } catch (error) {
//           Swal.fire({
//             title: "Error",
//             text: `Failed to issue certificate: ${
//               error.response?.data?.message || error.message
//             }`,
//             icon: "error",
//           });
//         } finally {
//           setLoading(false);
//         }
//       }
//     });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Issue Certificate</h2>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Student Name"
//             variant="outlined"
//             fullWidth
//             value={studentName}
//             onChange={(e) => setStudentName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <PersonIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Course Name"
//             variant="outlined"
//             fullWidth
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <SchoolIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Issuer Name"
//             variant="outlined"
//             fullWidth
//             value={issuerName}
//             onChange={(e) => setIssuerName(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <PersonIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Student Email"
//             variant="outlined"
//             fullWidth
//             value={studentEmail}
//             onChange={(e) => setStudentEmail(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <IconButton>
//                   <EmailIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//             disabled={loading}
//             style={{ position: "relative" }}
//           >
//             {loading && (
//               <CircularProgress
//                 size={24}
//                 style={{
//                   position: "absolute",
//                   left: "50%",
//                   top: "50%",
//                   marginLeft: "-12px",
//                   marginTop: "-12px",
//                 }}
//               />
//             )}
//             {loading ? "Issuing..." : "Issue Certificate"}
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default IssueCertificate;

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import "./IssueCertificate.css"; // Custom CSS file

const IssueCertificate = () => {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/govt-section");
  };
  const handleSubmit = async () => {
    if (!studentName || !courseName || !issuerName || !studentEmail) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill all required fields.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Confirm Issuance",
      text: `Are you sure you want to issue a certificate to ${studentName} for ${courseName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Issue Certificate",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await axios.post(
            "http://localhost:4000/api/certificates/issue",
            {
              studentName,
              courseName,
              issuerName,
              studentEmail,
            },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire({
            title: "Success",
            text: `Certificate issued successfully!`,
            icon: "success",
          });
          // Clear fields
          setStudentName("");
          setCourseName("");
          setIssuerName("");
          setStudentEmail("");
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `Failed to issue certificate: ${
              error.response?.data?.message || error.message
            }`,
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        // background: "#0f0c29 ",
        // background:
        //   "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        // background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        background: "#0575E" /* fallback for old browsers */,
        background:
          "-webkit-linear-gradient(to right, #021B79, #0575E6)" /* Chrome 10-25, Safari 5.1-6 */,
        background:
          "linear-gradient(to right, #021B79, #0575E6)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-white text-center w-36 rounded-xl h-10 absolute font-sans text-black text-lg font-semibold group m-4"
        style={{ top: "100px", left: "0" }} // Adjusting the position downwards
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white h-8 w-1/4 flex items-center justify-center absolute left-1 top-[2px] group-hover:w-[128px] z-10 duration-500">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#FFFFFF"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>
      <Box className="certificate-container">
        <Typography
          variant="h4"
          className="title"
          style={{ color: "black", margin: "30px" }}
        >
          Issue Certificate
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Student Name"
              variant="outlined"
              fullWidth
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton className="icon-button">
                    <PersonIcon />
                  </IconButton>
                ),
              }}
              className="text-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Course Name"
              variant="outlined"
              fullWidth
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton className="icon-button">
                    <SchoolIcon />
                  </IconButton>
                ),
              }}
              className="text-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Issuer Name"
              variant="outlined"
              fullWidth
              value={issuerName}
              onChange={(e) => setIssuerName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton className="icon-button">
                    <PersonIcon />
                  </IconButton>
                ),
              }}
              className="text-field"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Student Email"
              variant="outlined"
              fullWidth
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <IconButton className="icon-button">
                    <EmailIcon />
                  </IconButton>
                ),
              }}
              className="text-field"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              className="submit-button m-4"
            >
              {loading && <CircularProgress size={24} className="spinner" />}
              {loading ? "Issuing..." : "Issue Certificate"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default IssueCertificate;
