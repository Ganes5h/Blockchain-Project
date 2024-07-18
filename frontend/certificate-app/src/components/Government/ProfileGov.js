import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import {
  Home,
  Business,
  Room,
  Person,
  Email,
  Lock,
  Phone,
  PhotoCamera,
  Apartment,
  Work,
  Flag,
  VerifiedUser,
  Description,
  BusinessCenter,
} from "@mui/icons-material";
import axios from "axios";

const Profile = () => {
  const [governmentOffice, setGovernmentOffice] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [governmentDepartment, setGovernmentDepartment] = useState("");
  const [officialEmailAddress, setOfficialEmailAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [authorizedPersonName, setAuthorizedPersonName] = useState("");
  const [designation, setDesignation] = useState("");
  const [idProof, setIdProof] = useState("");
  const [password, setPassword] = useState("");

  const handleIdProofUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdProof(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Collect data and send to backend
    // Example:
    // const updatedData = {
    //   governmentOffice,
    //   organizationName,
    //   governmentDepartment,
    //   officialEmailAddress,
    //   contactNumber,
    //   officeAddress,
    //   city,
    //   state,
    //   country,
    //   authorizedPersonName,
    //   designation,
    //   idProof,
    //   password,
    // };
    // try {
    //   const response = await axios.put(`API_URL`, updatedData);
    //   console.log("Success:", response.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                <Avatar
                  src={idProof}
                  sx={{ height: "200px", width: "200px" }}
                />
                <label htmlFor="upload-id-proof">
                  <input
                    style={{ display: "none" }}
                    id="upload-id-proof"
                    name="upload-id-proof"
                    type="file"
                    onChange={handleIdProofUpload}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    startIcon={<PhotoCamera />}
                    style={{ backgroundColor: "#20B486" }}
                  >
                    Upload ID Proof
                  </Button>
                </label>
              </Stack>
            </Grid>
            <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Government Office</InputLabel>
                    <OutlinedInput
                      value={governmentOffice}
                      onChange={(e) => setGovernmentOffice(e.target.value)}
                      label="Government Office"
                      startAdornment={<Apartment />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Organization Name</InputLabel>
                    <OutlinedInput
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      label="Organization Name"
                      startAdornment={<Business />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Government Department</InputLabel>
                    <OutlinedInput
                      value={governmentDepartment}
                      onChange={(e) => setGovernmentDepartment(e.target.value)}
                      label="Government Department"
                      startAdornment={<Work />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Official Email Address</InputLabel>
                    <OutlinedInput
                      type="email"
                      value={officialEmailAddress}
                      onChange={(e) => setOfficialEmailAddress(e.target.value)}
                      label="Official Email Address"
                      startAdornment={<Email />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Contact Number</InputLabel>
                    <OutlinedInput
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      label="Contact Number"
                      startAdornment={<Phone />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Office Address</InputLabel>
                    <OutlinedInput
                      value={officeAddress}
                      onChange={(e) => setOfficeAddress(e.target.value)}
                      label="Office Address"
                      startAdornment={<Home />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
                      startAdornment={<Room />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>State</InputLabel>
                    <OutlinedInput
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
                      startAdornment={<Room />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      label="Country"
                      startAdornment={<Flag />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Authorized Person's Name</InputLabel>
                    <OutlinedInput
                      value={authorizedPersonName}
                      onChange={(e) => setAuthorizedPersonName(e.target.value)}
                      label="Authorized Person's Name"
                      startAdornment={<Person />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Designation</InputLabel>
                    <OutlinedInput
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      label="Designation"
                      startAdornment={<BusinessCenter />}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      startAdornment={<Lock />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Profile;
