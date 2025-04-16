import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Box } from "@mui/material";
import { register } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput } from "../components/customize/FormInput";
import { hasValue } from "../utils/utils";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const validate = () => {
    let _error = { ...{
      username: "",
      fullname: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    } };
    let isValid = true;

    const requiredFields = [
      "username",
      "fullname",
      "email",
      "phone",
      "address",
      "password",
    ];

    requiredFields.forEach((field) => {
      if (!hasValue(data[field])) {
        _error[field] = `${field} is required`;
        isValid = false;
      }
    });
    setError(_error);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      let res = await register(data);
      if (res.statusCode === 201) {
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "calc(80% - 16px)", sm: "50%", md: "50%", lg: "30%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        m: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Sign Up
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Username"
            placeholder="Username..."
            maxLength={20}
            type="text"
            name="username"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Fullname"
            placeholder="Fullname..."
            maxLength={20}
            type="text"
            name="fullname"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Email"
            placeholder="Email..."
            maxLength={20}
            type="email"
            name="email"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Phone"
            placeholder="Phone..."
            maxLength={10}
            type="number"
            name="phone"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Address"
            placeholder="Address..."
            maxLength={100}
            type="text"
            name="address"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{ mb: 1 }}>
          <FormInput
            label="Password"
            placeholder="Password..."
            maxLength={20}
            type="password"
            name="password"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Button
            fullWidth
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Box
              component={Link}
              to="/login"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign in
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
