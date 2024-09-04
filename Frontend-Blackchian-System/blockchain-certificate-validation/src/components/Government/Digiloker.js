// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

// const DigiLockerManager = () => {
//   const [digiLocker, setDigiLocker] = useState(null);
//   const [certificateId, setCertificateId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const token = useSelector((state) => state.auth.token);

//   const apiUrl = "http://localhost:4000/api/digilocker";

//   useEffect(() => {
//     const fetchDigiLocker = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(apiUrl, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         setDigiLocker(response.data.data.digiLocker);
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: `Failed to fetch DigiLocker: ${error.message}`,
//           icon: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDigiLocker();
//   }, [token]);

//   const handleCreateDigiLocker = async () => {
//     setLoading(true);
//     try {
//       if (digiLocker) {
//         Swal.fire({
//           title: "Info",
//           text: "DigiLocker already exists.",
//           icon: "info",
//         });
//         return;
//       }

//       const response = await axios.post(
//         `${apiUrl}/create`,
//         {},
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setDigiLocker(response.data.data.digiLocker);
//       Swal.fire({
//         title: "Success",
//         text: "DigiLocker created successfully",
//         icon: "success",
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: `Failed to create DigiLocker: ${error.message}`,
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCertificate = async () => {
//     if (!certificateId) {
//       Swal.fire({
//         title: "Input Required",
//         text: "Please provide a certificate ID.",
//         icon: "warning",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(
//         `${apiUrl}/add-certificate/${certificateId}`,
//         {},
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setDigiLocker((prev) => ({
//         ...prev,
//         certificates: [...prev.certificates, { _id: certificateId }],
//       }));
//       Swal.fire({
//         title: "Success",
//         text: "Certificate added to DigiLocker",
//         icon: "success",
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: `Failed to add certificate: ${error.message}`,
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveCertificate = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(
//         `${apiUrl}/remove-certificate/${id}`,
//         {},
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setDigiLocker((prev) => ({
//         ...prev,
//         certificates: prev.certificates.filter((cert) => cert._id !== id),
//       }));
//       Swal.fire({
//         title: "Success",
//         text: "Certificate removed from DigiLocker",
//         icon: "success",
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: `Failed to remove certificate: ${error.message}`,
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>DigiLocker Manager</h2>
//       {loading && <p>Loading...</p>}
//       {!digiLocker && (
//         <button
//           onClick={handleCreateDigiLocker}
//           style={{ marginBottom: "20px" }}
//         >
//           Create DigiLocker
//         </button>
//       )}
//       {digiLocker && (
//         <>
//           <div>
//             <h3>Current DigiLocker</h3>
//             <pre>{JSON.stringify(digiLocker, null, 2)}</pre>
//             <div>
//               <h4>Certificates</h4>
//               <ul>
//                 {digiLocker.certificates.map((cert) => (
//                   <li key={cert._id}>
//                     <div>
//                       <strong>ID:</strong> {cert._id}
//                     </div>
//                     <div>
//                       <strong>Hash:</strong> {cert.certificateHash}
//                     </div>
//                     <div>
//                       <strong>Student Name:</strong> {cert.studentName}
//                     </div>
//                     <div>
//                       <strong>Course Name:</strong> {cert.courseName}
//                     </div>
//                     <div>
//                       <strong>Issuer Name:</strong> {cert.issuerName}
//                     </div>
//                     <div>
//                       <strong>Issue Date:</strong>{" "}
//                       {new Date(cert.issueDate).toLocaleDateString()}
//                     </div>
//                     <div>
//                       <strong>Valid:</strong> {cert.isValid ? "Yes" : "No"}
//                     </div>
//                     <button
//                       onClick={() => handleRemoveCertificate(cert._id)}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       Remove
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <input
//                 type="text"
//                 value={certificateId}
//                 onChange={(e) => setCertificateId(e.target.value)}
//                 placeholder="Enter Certificate ID"
//                 style={{ padding: "10px", marginRight: "10px" }}
//               />
//               <button
//                 onClick={handleAddCertificate}
//                 style={{ marginRight: "10px" }}
//               >
//                 Add Certificate
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default DigiLockerManager;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { Button, Card, CardContent, Typography } from "@mui/material";

// const DigiLockerCertificates = () => {
//   const [certificates, setCertificates] = useState([]);
//   const token = localStorage.getItem("token"); // Assuming token is stored in local storage

//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/digilocker",
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setCertificates(response.data.data.digiLocker.certificates);
//       } catch (error) {
//         console.error("Error fetching certificates:", error);
//       }
//     };

//     fetchCertificates();
//   }, [token]);

//   const handleRemoveCertificate = async (certificateId) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:4000/api/digilocker/remove-certificate/${certificateId}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           title: "Removed!",
//           text: "Certificate removed from DigiLocker successfully.",
//           icon: "success",
//           confirmButtonText: "OK",
//         });

//         setCertificates((prevCertificates) =>
//           prevCertificates.filter((cert) => cert._id !== certificateId)
//         );
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: response.data.message || "Failed to remove certificate.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       console.error("Error removing certificate:", error);
//       Swal.fire({
//         title: "Error!",
//         text: "An error occurred while removing the certificate.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   // const handleViewCertificate = (certificateHash) => {
//   const handleViewCertificate = (certificateHash) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You are about to view this certificate",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, view it!",
//       cancelButtonText: "No, cancel!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         window.open(
//           `http://localhost:4000/certificates/${certificateHash}.pdf`,
//           "_blank"
//         );
//       }
//     });
//   };
//   // };

//   return (
//     <div style={{ padding: "20px" }}>
//       {certificates.length === 0 ? (
//         <Typography variant="h6">
//           No certificates found in DigiLocker.
//         </Typography>
//       ) : (
//         certificates.map((cert) => (
//           <Card key={cert._id} style={{ marginBottom: "20px" }}>
//             <CardContent>
//               <Typography variant="h6">{cert.courseName}</Typography>
//               <Typography color="textSecondary">{cert.studentName}</Typography>
//               <Typography color="textSecondary">{cert.issuerName}</Typography>
//               <Typography color="textSecondary">
//                 {new Date(cert.issueDate).toLocaleDateString()}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{ marginRight: "10px" }}
//                 onClick={() => handleViewCertificate(cert.certificateHash)}
//               >
//                 View Certificate
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() => handleRemoveCertificate(cert._id)}
//               >
//                 Remove Certificate
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// };

// export default DigiLockerCertificates;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Pagination,
  IconButton,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const DigiLockerCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const certificatesPerPage = 5;
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/digilocker",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allCertificates = response.data.data.digiLocker.certificates;
        setTotalCertificates(allCertificates.length);
        setTotalPages(Math.ceil(allCertificates.length / certificatesPerPage));
        setCertificates(
          allCertificates.slice(
            (currentPage - 1) * certificatesPerPage,
            currentPage * certificatesPerPage
          )
        );
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, [currentPage, token]);

  const handleRemoveCertificate = async (certificateId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/digilocker/remove-certificate/${certificateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: "Removed!",
          text: "Certificate removed from DigiLocker successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        setCertificates((prevCertificates) =>
          prevCertificates.filter((cert) => cert._id !== certificateId)
        );
        setTotalCertificates((prevCount) => prevCount - 1);
        setTotalPages(Math.ceil((totalCertificates - 1) / certificatesPerPage));
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Failed to remove certificate.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error removing certificate:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while removing the certificate.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleViewCertificate = (certificateHash) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to view this certificate",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, view it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          `http://localhost:4000/certificates/${certificateHash}.pdf`,
          "_blank"
        );
      }
    });
  };

  const handleCreateDigiLocker = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/digilocker/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: "Created!",
          text: "DigiLocker created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Info!",
          text: response.data.message || "DigiLocker already exists.",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Info!",
        text: "DigiLocker already exists.",
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const handleClick = () => {
    if (user.role === "student") {
      navigate("/student-section");
    } else if (user.role === "industry") {
      navigate("/industry-section");
    } else if (user.role === "government") {
      navigate("/govt-section");
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{
        padding: "20px",
        position: "relative",
        background: "#0f0c29 ",
        background:
          "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        height: "90vh",
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="bg-white text-center w-36 rounded-xl h-10 absolute font-sans text-black text-lg font-semibold group m-4"
        style={{ top: "0px", left: "0" }} // Adjusting the position downwards
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
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
        onClick={handleCreateDigiLocker}
      >
        Create DigiLocker
      </Button>

      {certificates.length === 0 ? (
        <Typography variant="h6" style={{ color: "white" }}>
          No certificates found in DigiLocker.
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ marginTop: "30px" }}>
          {certificates.map((cert) => (
            <Grid item xs={12} sm={6} md={4} key={cert._id}>
              <Card sx={{ minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h6">{cert.courseName}</Typography>
                  <Typography color="textSecondary">
                    {cert.studentName}
                  </Typography>
                  <Typography color="textSecondary">
                    {cert.issuerName}
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </Typography>
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleViewCertificate(cert.certificateHash)
                      }
                      sx={{ m: 1 }}
                    >
                      View
                      <IconButton color="primary">
                        {/* <VisibilityIcon /> */}
                      </IconButton>
                    </Button>

                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveCertificate(cert._id)}
                      sx={{ m: 1 }}
                    >
                      {/* <IconButton
                        color="secondary"
                        onClick={() => handleRemoveCertificate(cert._id)}
                      ></IconButton> */}
                      Remove <DeleteIcon />
                    </Button>
                    {/* </IconButton> */}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: "white",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "white",
            color: "black",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      />
    </div>
  );
};

export default DigiLockerCertificates;
