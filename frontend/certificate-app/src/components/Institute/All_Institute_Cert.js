import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material';

function AllCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));
  const institutionId = userData ? userData.user_id : null;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:4000/certificates/institution/${institutionId}`);
        setCertificates(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    if (institutionId) {
      fetchCertificates();
    } else {
      console.error("Institution ID not found in localStorage");
    }
  }, [institutionId]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Certificate Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certificates.map((certificate) => (
            <TableRow key={certificate._id}>
              <TableCell>{certificate.student_id}</TableCell>
              <TableCell>{certificate.name}</TableCell>
              <TableCell>{certificate.course}</TableCell>
              <TableCell>{certificate.grade}</TableCell>
              <TableCell>{certificate.certificate_hash}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllCertificates;
