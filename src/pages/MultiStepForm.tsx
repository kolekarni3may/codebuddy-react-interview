/* eslint-disable linebreak-style */
import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Paper } from "@mui/material";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useNavigate } from "react-router-dom";

export interface Errors {
  emailId?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  countryCode?: string;
  phoneNumber?: string;
  acceptTermsAndCondition?: string;
}

const MultiStepForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);

  const steps = ["Form 1", "Form 2", "Form 3"];

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCompletedSteps((prevCompletedSteps) =>
        prevCompletedSteps.map((completed, index) => (index === activeStep ? true : completed))
      );
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step) => {
    if (completedSteps.slice(0, step).every((completed) => completed)) {
      setActiveStep(step);
    }
  };

  const validateForm = () => {
    let tempErrors: Errors = {};
    switch (activeStep) {
      case 0:
        tempErrors.emailId = formData.emailId ? "" : "Email is required";
        tempErrors.emailId = /^\S+@\S+\.\S+$/.test(formData.emailId)
          ? tempErrors.emailId
          : "Email is not valid";
        tempErrors.password = formData.password ? "" : "Password is required";
        tempErrors.password =
          /(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])/.test(
            formData.password,
          )
            ? tempErrors.password
            : "Password must contain 2 capital letters, 2 small letters, 2 numbers, and 2 special characters";
        break;
      case 1:
        tempErrors.firstName = formData.firstName ? "" : "First name is required";
        tempErrors.firstName = /^[A-Za-z]+$/.test(formData.firstName)
          ? tempErrors.firstName
          : "Only alphabets are allowed";
        tempErrors.firstName =
          formData.firstName.length >= 2 && formData.firstName.length <= 50
            ? tempErrors.firstName
            : "First name must be between 2 and 50 characters";
        if (formData.lastName) {
          tempErrors.lastName = /^[A-Za-z]+$/.test(formData.lastName)
            ? ""
            : "Only alphabets are allowed";
        }
        tempErrors.address =
          formData.address.length >= 10 ? "" : "Address must be at least 10 characters";
        break;
      case 2:
        tempErrors.countryCode = formData.countryCode ? "" : "Country code is required";
        tempErrors.phoneNumber = /^\d{10}$/.test(formData.phoneNumber)
          ? ""
          : "Phone number must be 10 digits";
        tempErrors.acceptTermsAndCondition = formData.acceptTermsAndCondition
          ? ""
          : "You must accept the terms and conditions";
        break;
      default:
        break;
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { acceptTermsAndCondition, ...dataToSubmit } = formData;
      try {
        const response = await fetch("https://codebuddy.review/submit", {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
        });

        if (response.ok) {
          navigate("/posts");
        } else {
          alert("Failed to submit form");
        }
      } catch (error) {
        alert("Error submitting form");
      }
    }
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <Form1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <Form2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <Form3
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: "500px" },
          padding: 4,
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} onClick={() => handleStepClick(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>{renderForm()}</Box>
      </Paper>
    </Box>
  );
};

export default MultiStepForm;
