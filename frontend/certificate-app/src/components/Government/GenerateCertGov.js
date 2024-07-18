import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  InputAdornment,
  Dialog,
  DialogContent,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TemplateIcon from "@mui/icons-material/Note";
import Certificate_1 from "../CertificateTemplates/Certificate_1/Certificate_1";
import Certificate_2 from "../CertificateTemplates/Certificate_2/Certificate_2";
import Certificate_3 from "../CertificateTemplates/Certificate_3/Certificate_3";

const certificateTemplates = [
  { label: "Template 1", value: "template1" },
  { label: "Template 2", value: "template2" },
  { label: "Template 3", value: "template3" },
];

const GenerateCertificate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    uniqueId: "",
    template: null,
    course: "",
    expirationDate: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTemplateChange = (event, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      template: newValue,
    }));
  };

  const handlePreview = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Handle form submission logic here
  };

  const isFormComplete =
    formData.fullName &&
    formData.uniqueId &&
    formData.template &&
    formData.course &&
    formData.expirationDate;

  const renderSelectedTemplate = () => {
    const { template, fullName, course, expirationDate } = formData;
    switch (template?.value) {
      case "template1":
        return (
          <Certificate_1
            recipient={fullName}
            course={course}
            date={expirationDate}
          />
        );
      case "template2":
        return (
          <Certificate_2
            recipient={fullName}
            course={course}
            date={expirationDate}
          />
        );
      case "template3":
        return (
          <Certificate_3
            recipient={fullName}
            course={course}
            date={expirationDate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      //   height="100vh"
      //   bgcolor="#f5f5f5"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Generate Certificate
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="80%"
        gap={2}
        p={3}
        bgcolor="white"
        borderRadius="12px"
        boxShadow={3}
      >
        <TextField
          name="fullName"
          label="Full Name"
          variant="outlined"
          fullWidth
          value={formData.fullName}
          onChange={handleInputChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="uniqueId"
          label="Unique ID"
          variant="outlined"
          fullWidth
          value={formData.uniqueId}
          onChange={handleInputChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon />
              </InputAdornment>
            ),
          }}
        />
        <Autocomplete
          options={certificateTemplates}
          getOptionLabel={(option) => option.label}
          value={formData.template}
          onChange={handleTemplateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Certificate Template"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <TemplateIcon />
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
          fullWidth
        />
        <TextField
          name="course"
          label="Course of Certification"
          variant="outlined"
          fullWidth
          value={formData.course}
          onChange={handleInputChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="expirationDate"
          label="Expiration Date"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.expirationDate}
          onChange={handleInputChange}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DateRangeIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          // color="secondary"
          sx={{
            color: "#412C49",
            backgroundColor: "#fff",
            border: "2px solid #412C49",
          }}
          fullWidth
          disabled={!isFormComplete}
          onClick={handlePreview}
          className="text-[#412C49]"
        >
          Preview
        </Button>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#412C49",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#1F0954",
            },
          }}
          variant="contained"
          color="primary"
          fullWidth
        >
          Generate Certificate
        </Button>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>{renderSelectedTemplate()}</DialogContent>
      </Dialog>
    </Box>
  );
};

export default GenerateCertificate;