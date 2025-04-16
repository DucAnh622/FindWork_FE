import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { login } from "../services/userService";
import { useDispatch } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFail,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput } from "../components/customize/FormInput";
import { hasValue } from "../utils/utils";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const validate = () => {
    let _error = { ...{email: "", password: ""} };
    let isValid = true;

    const requiredFields = ["email", "password"];

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
      dispatch(loginRequest());
      const res = await login(data);
      if (res.statusCode === 201) {
        toast.success(res.message);
        dispatch(loginSuccess(res.data));
        const roles = res.data.user?.roles || [];
        if (roles.some((role) => ["Admin", "Hr"].includes(role))) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.message);
        dispatch(loginFail());
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
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
        bgcolor: "background.paper",
        m: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Login
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{mb:1}}>
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
        <Grid item xs={12} md={12} lg={12}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 1,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Keep me signed in"
              sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
            />
            <Box
              component={Link}
              to="/forgot-password"
              sx={{
                width: "100%",
                textAlign: { xs: "center", sm: "right" },
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Box>
          </Box>

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Box
              component={Link}
              to="/register"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Sign up
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
