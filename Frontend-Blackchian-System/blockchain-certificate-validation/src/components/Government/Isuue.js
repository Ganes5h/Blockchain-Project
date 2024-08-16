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

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const IssueCertificate = () => {
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store

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
    <div style={{ padding: "20px" }}>
      <h2>Issue Certificate</h2>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Name"
            variant="outlined"
            fullWidth
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <PersonIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SchoolIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Issuer Name"
            variant="outlined"
            fullWidth
            value={issuerName}
            onChange={(e) => setIssuerName(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <PersonIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Student Email"
            variant="outlined"
            fullWidth
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <EmailIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ position: "relative" }}
          >
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-12px",
                  marginTop: "-12px",
                }}
              />
            )}
            {loading ? "Issuing..." : "Issue Certificate"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default IssueCertificate;
