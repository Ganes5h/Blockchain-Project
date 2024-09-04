import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  CircularProgress,
  Slide,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartJS from "chart.js/auto";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CountUp from "react-countup";
// import { AnimatedCard } from "mui-animated-cards";

const Dashboard = () => {
  const AnimatedCard = styled(Card)(({ theme }) => ({
    width: "400px", // Increased width
    height: "200px", // Increased height
    // margin: "16px",
    transition: "transform 0.3s ease-in-out", // Smooth scaling transition
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", // Align content vertically
    "&:hover": {
      transform: "scale(1.1)", // Scale up on hover
    },
  }));
  const [role, setRole] = useState("student");
  const [userCounts, setUserCounts] = useState({});
  const [certificatesCounts, setCertificatesCounts] = useState({});
  const [certificatesByRole, setCertificatesByRole] = useState({});
  const [digilockersByRole, setDigilockersByRole] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user counts by role
        const userCountsResponse = await axios.get(
          "http://localhost:4000/api/admin/users/count"
        );
        setUserCounts(userCountsResponse.data.data);

        // Fetch total certificates issued and revoked
        const certificatesResponse = await axios.get(
          "http://localhost:4000/api/admin/certificates/total"
        );
        setCertificatesCounts(certificatesResponse.data.data);

        // Fetch certificates and digilockers by role
        const certificatesByRoleResponse = await axios.get(
          `http://localhost:4000/api/admin/certificates/role?role=${role}`
        );
        setCertificatesByRole(certificatesByRoleResponse.data.data);

        const digilockersByRoleResponse = await axios.get(
          `http://localhost:4000/api/admin/digilockers/role?role=${role}`
        );
        setDigilockersByRole(digilockersByRoleResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const pieData = {
    labels: ["Issued", "Revoked"],
    datasets: [
      {
        label: "Certificates",
        data: [certificatesByRole.issued || 0, certificatesByRole.revoked || 0],
        backgroundColor: ["#3f51b5", "#ff5722"],
      },
    ],
  };

  const barData = {
    labels: ["Issued", "Revoked"],
    datasets: [
      {
        label: "Certificates",
        data: [certificatesByRole.issued || 0, certificatesByRole.revoked || 0],
        backgroundColor: "#3f51b5",
        borderColor: "#003c8f",
        borderWidth: 1,
      },
    ],
  };

  const digilockerData = {
    labels: ["Total Digilockers"],
    datasets: [
      {
        label: "Digilockers",
        data: [digilockersByRole.total || 0],
        backgroundColor: "#4caf50",
      },
    ],
  };
  const chartData = [
    { name: "Issued", count: certificatesByRole.issued || 0 },
    { name: "Revoked", count: certificatesByRole.revoked || 0 },
  ];

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Slide direction="up" in={true} timeout={1000}>
              <AnimatedCard>
                <div
                  sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "#e3f2fd",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Total Users</Typography>
                    <Typography variant="h3">
                      <CountUp
                        end={Object.values(userCounts).reduce(
                          (a, b) => a + b,
                          0
                        )}
                        duration={2.5}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </AnimatedCard>
            </Slide>
            <Slide direction="up" in={true} timeout={1200}>
              <AnimatedCard>
                <div
                  sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "#c8e6c9",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      Total Certificates Issued
                    </Typography>
                    <Typography variant="h3">
                      <CountUp end={certificatesCounts.issued} duration={2.5} />
                    </Typography>
                  </CardContent>
                </div>
              </AnimatedCard>
            </Slide>
            <Slide direction="up" in={true} timeout={1400}>
              <AnimatedCard>
                <div
                  sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "#ffcdd2",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">
                      Total Certificates Revoked
                    </Typography>
                    <Typography variant="h3">
                      <CountUp
                        end={certificatesCounts.revoked}
                        duration={2.5}
                      />
                    </Typography>
                  </CardContent>
                </div>
              </AnimatedCard>
            </Slide>
            <Slide direction="up" in={true} timeout={1600}>
              <AnimatedCard>
                <div
                  sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // bgcolor: "#e8f5e9",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">Total Digilockers</Typography>
                    <Typography variant="h3">
                      <CountUp end={digilockerData} duration={2.5} />
                    </Typography>
                  </CardContent>
                </div>
              </AnimatedCard>
            </Slide>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Select
              value={role}
              onChange={handleRoleChange}
              displayEmpty
              inputProps={{ "aria-label": "Select Role" }}
              sx={{ mb: 2, width: 200 }}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="government">Government</MenuItem>
              <MenuItem value="industry">Industry</MenuItem>
              <MenuItem value="institute">Institute</MenuItem>
            </Select>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">
                Certificates Issued Over Time (Line Chart)
              </Typography>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#3f51b5" />
                </LineChart>
              </ResponsiveContainer>

              {/* </Box> */}
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1, mb: 3 }}>
                <Typography variant="h6">
                  Certificates Issued vs Revoked (Bar Chart)
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        title: {
                          display: true,
                          text: "Certificates Issued vs Revoked",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ flex: 1, mb: 3 }}>
                <Typography variant="h6">
                  Certificates Issued vs Revoked (Pie Chart)
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { position: "top" },
                        tooltip: {
                          callbacks: {
                            label: (tooltipItem) =>
                              `${tooltipItem.label}: ${tooltipItem.raw}`,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
