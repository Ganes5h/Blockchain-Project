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

const SearchCertificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(6);
  const token = useSelector((state) => state.auth.token);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Certificates
      </Typography>
      <TextField
        label="Search by name, course, issuer, or date"
        variant="outlined"
        fullWidth
        onChange={handleSearch}
        value={searchTerm}
        margin="normal"
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
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default SearchCertificates;
