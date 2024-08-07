import React from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

const Form3 = ({ formData, setFormData, errors, handleChange, handleBack, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth size="small">
        <InputLabel id="countryCode">Country Code</InputLabel>
        <Select
          id="countryCode"
          name="countryCode"
          label="Country Code"
          value={formData.countryCode}
          onChange={handleChange}
          error={Boolean(errors.countryCode)}
        >
          <MenuItem value="+91">India (+91)</MenuItem>
          <MenuItem value="+1">America (+1)</MenuItem>
        </Select>
        {errors.countryCode && <p>{errors.countryCode}</p>}
      </FormControl>
      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        size="small"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
        margin="dense"
      />

      <FormControl component="fieldset" error={Boolean(errors.acceptTermsAndCondition)}>
        <FormControlLabel
          control={
            <Checkbox
              id="acceptTermsAndCondition"
              name="acceptTermsAndCondition"
              checked={formData.acceptTermsAndCondition}
              onChange={handleChange}
            />
          }
          label="I accept the terms and conditions"
        />
        {errors.acceptTermsAndCondition && (
          <FormHelperText>{errors.acceptTermsAndCondition}</FormHelperText>
        )}
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" onClick={handleBack} sx={{ textTransform: "none" }}>
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ textTransform: "none" }}>
          Save
        </Button>
      </Box>
    </form>
  );
};

export default Form3;
