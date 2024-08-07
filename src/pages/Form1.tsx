import { TextField, Button, Box } from "@mui/material";
import React from 'react';



const Form1 = ({ formData, setFormData, errors, handleChange, handleNext }) => {
  return (
    <form onSubmit={handleNext}>
      <TextField
        fullWidth
        id="emailId"
        name="emailId"
        label="Email"
        size="small"
        value={formData.emailId}
        onChange={handleChange}
        error={Boolean(errors.emailId)}
        helperText={errors.emailId}
        margin="dense"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        size="small"
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        margin="dense"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
          Save and Next
        </Button>
      </Box>
    </form>
  );
};

export default Form1;
