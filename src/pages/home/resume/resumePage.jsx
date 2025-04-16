import { Grid, Box, Button, Modal, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FormInput } from "../../../components/customize/FormInput";
import { createResume } from "../../../services/resumeService";
import { hasValue } from "../../../utils/utils";
import { ImageCard } from "../../../components/home/cardTemplate/imageCard";
import "../../../assets/styles/dashBoard.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { FormFile } from "../../../components/customize/FormFile";
import { useSelector } from "react-redux";
import { CircularWithValueLabel } from "../../../components/customize/loading";

export const ResumePage = () => {
  const user = useSelector((state) => state.user?.login?.user);
  const dataDefault = {
    nameCV: "",
    template: "",
    url: "",
  };

  const errorDefault = {
    nameCV: "",
    template: "",
    url: "",
  };

  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(errorDefault);
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const validate = () => {
    let _error = { ...errorDefault };
    let isValid = true;

    const requiredFields = ["nameCV", "url"];

    requiredFields.forEach((field) => {
      if (!hasValue(data[field])) {
        _error[field] = `${field} is required`;
        isValid = false;
      }
    });
    setError(_error);
    return isValid;
  };

  const handleClose = () => {
    setOpen(false);
    setData(dataDefault);
    setError(dataDefault);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (validate()) {
      let res = await createResume({
        ...data,
        template: "template0",
        status: "new",
      });
      if (res && res.statusCode === 201) {
        toast.success(res.message);
        navigate(`/my-resume/${user?._id}`);
        setLoading(false);
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      toast.warning("Login to do!");
    }
  };

  const listTemplate = [
    {
      id: 0,
      image: null,
    },
  ];

  return (
    <div className="ContentPage">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", mt: 1, fontWeight: "bold" }}
          >
            Resume
          </Typography>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
          {listTemplate.map((item, index) => (
            <Grid item xs={12} sm={4} md={3} lg={2} key={index}>
              <ImageCard
                template={item}
                data={data}
                handleOpen={() => handleOpen()}
                setData={setData}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => handleClose()}>
        {isLoading === false ? (
          <Grid
            container
            spacing={2}
            sx={{
              width: { xs: "80%", sm: "50%", md: "50%", lg: "30%" },
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "flex-start",
              maxWidth: 600,
            }}
          >
            <Grid item xs={12} sx={{ p: 0, mb: 2, mt: 0 }}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                Create resume
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ p: "0px !important", width: "100%" }}>
              <FormInput
                label="Name resume"
                placeholder="New resume"
                maxLength={100}
                type="text"
                name="nameCV"
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ p: "0px !important", mt: 1 }}
            >
              <FormFile
                label="File"
                name="url"
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
                sx={{ mr: 1 }}
                startIcon={<CheckIcon />}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => handleClose()}
                color="error"
                startIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        ) : (
          <CircularWithValueLabel />
        )}
      </Modal>
    </div>
  );
};
