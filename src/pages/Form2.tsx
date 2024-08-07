import React from "react";
import { TextField, Button, Box } from "@mui/material";

const Form2 = ({ formData, setFormData, errors, handleChange, handleNext, handleBack }) => {
  return (
    <form onSubmit={handleNext}>
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        size="small"
        value={formData.firstName}
        onChange={handleChange}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName}
        margin="dense"
      />
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        size="small"
        value={formData.lastName}
        onChange={handleChange}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName}
        margin="dense"
      />
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Address"
        size="small"
        value={formData.address}
        onChange={handleChange}
        error={Boolean(errors.address)}
        helperText={errors.address}
        margin="dense"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" onClick={handleBack} sx={{ textTransform: "none" }}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
          Save and Next
        </Button>
      </Box>
    </form>
  );
};

export default Form2;
