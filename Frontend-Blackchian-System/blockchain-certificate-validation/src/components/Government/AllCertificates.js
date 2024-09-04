// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Pagination,
//   Container,
// } from "@mui/material";
// import Swal from "sweetalert2";
// import { useSelector } from "react-redux";

// const SearchCertificates = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [certificates, setCertificates] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [certificatesPerPage] = useState(6);
//   const token = useSelector((state) => state.auth.token);
//   const fetchCertificates = async (term) => {
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/certificates/search-certificates?searchTerm=${term}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setCertificates(data);
//     } catch (error) {
//       console.error("Error fetching certificates:", error);
//     }
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       fetchCertificates(searchTerm);
//     }
//   }, [searchTerm]);

//   // Calculate the certificates to display on the current page
//   const indexOfLastCertificate = currentPage * certificatesPerPage;
//   const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
//   const currentCertificates = certificates.slice(
//     indexOfFirstCertificate,
//     indexOfLastCertificate
//   );

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleAddToDigiLocker = (certificate) => {
//     // Implement functionality to add to DigiLocker
//     console.log("Add to DigiLocker:", certificate);
//   };

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

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Search Certificates
//       </Typography>
//       <TextField
//         label="Search by name, course, issuer, or date"
//         variant="outlined"
//         fullWidth
//         onChange={handleSearch}
//         value={searchTerm}
//         margin="normal"
//       />

//       <Grid container spacing={3}>
//         {currentCertificates.map((certificate) => (
//           <Grid item xs={12} sm={6} md={4} key={certificate._id}>
//             <Card sx={{ minHeight: 200 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {certificate.studentName}
//                 </Typography>
//                 <Typography variant="body1" color="textSecondary">
//                   {certificate.courseName}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   {new Date(certificate.issueDate).toLocaleDateString()}
//                 </Typography>
//               </CardContent>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleAddToDigiLocker(certificate)}
//                 sx={{ m: 1 }}
//               >
//                 Add to DigiLocker
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={() =>
//                   handleViewCertificate(certificate.certificateHash)
//                 }
//                 sx={{ m: 1 }}
//               >
//                 View
//               </Button>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Pagination
//         count={Math.ceil(certificates.length / certificatesPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//         sx={{ mt: 3, display: "flex", justifyContent: "center" }}
//       />
//     </Container>
//   );
// };

// export default SearchCertificates;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Pagination,
  Container,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchCertificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(6);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  // Fetch all certificates on component mount
  useEffect(() => {
    const fetchAllCertificates = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/certificates/all-certificates",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setCertificates(data.data); // Update here to use `data.data`
      } catch (error) {
        console.error("Error fetching all certificates:", error);
      }
    };

    fetchAllCertificates();
  }, [token]);

  // Fetch certificates based on search term
  const fetchCertificates = async (term) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/certificates/search-certificates?searchTerm=${term}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCertificates(data.data); // Update here to use `data.data`
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCertificates(searchTerm);
    }
  }, [searchTerm, token]);

  // Calculate the certificates to display on the current page
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate
  );

  const handleAddToDigiLocker = async (certificateData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/digilocker/add-certificate/${certificateData._id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, message } = response.data;

      if (status === "success") {
        Swal.fire({
          title: "Success!",
          text: "Certificate added to DigiLocker successfully.",
          icon: "success",
          confirmButtonText: "OK",
          footer:
            '<a href="http://localhost:3000/digilocker">View in DigiLocker</a>', // Add a link to view DigiLocker
        });
      } else if (
        status === "fail" &&
        message === "Certificate already exists in the DigiLocker"
      ) {
        Swal.fire({
          title: "Already Added",
          text: "This certificate is already present in your DigiLocker.",
          icon: "info",
          confirmButtonText: "OK",
        });
      } else if (status === "fail" && message === "Certificate not found") {
        Swal.fire({
          title: "Not Found",
          text: "The specified certificate does not exist.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (
        status === "fail" &&
        message === "DigiLocker not found for this user"
      ) {
        Swal.fire({
          title: "Not Found",
          text: "DigiLocker account not found for the user.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: message || "Failed to add certificate to DigiLocker.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Already Added",
        text: "This certificate is already present in your DigiLocker.",
        icon: "info",
        confirmButtonText: "OK",
        footer:
          '<a href="http://localhost:3000/digilocker">View in DigiLocker</a>',
      });
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const handleAddToDigiLocker = (certificate) => {
  //   // Implement functionality to add to DigiLocker
  //   console.log("Add to DigiLocker:", certificate);
  // };

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

  const handleClick = () => {
    if (user.role === "student") {
      navigate("/student-section");
    } else if (user.role === "industry") {
      navigate("/industry-section");
    } else if (user.role === "government") {
      navigate("/govt-section");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div
      style={{
        background: "#0f0c29 ",
        background:
          "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
        height: "100vh",
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

      <Container>
        <Typography
          variant="h4"
          style={{ color: "white", textAlign: "center", paddingTop: "5px" }}
        >
          Search Certificates
        </Typography>
        <TextField
          label="Search by name, course, issuer, or date"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
          value={searchTerm}
          margin="normal"
          InputProps={{
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              color: "white",
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
              "&.Mui-focused": {
                color: "white",
              },
            },
          }}
        />

        <Grid container spacing={3}>
          {currentCertificates.map((certificate) => (
            <Grid item xs={12} sm={6} md={4} key={certificate._id}>
              <Card sx={{ minHeight: 200 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {certificate.studentName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {certificate.courseName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {new Date(certificate.issueDate).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToDigiLocker(certificate)}
                  sx={{ m: 1 }}
                >
                  Add to DigiLocker
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    handleViewCertificate(certificate.certificateHash)
                  }
                  sx={{ m: 1 }}
                >
                  View
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(certificates.length / certificatesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
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
      </Container>
    </div>
  );
};

export default SearchCertificates;
