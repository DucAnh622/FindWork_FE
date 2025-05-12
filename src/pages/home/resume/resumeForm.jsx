import React, { useState, useRef } from "react";
import { Box, Modal, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setPersonalInfo,
  setEducation,
  setExperience,
  setProjects,
  clearData,
} from "../../../redux/slices/rootSlice";
import FormInfo from "./formStep/formInfo";
import FormEducation from "./formStep/formEducation";
import FormExperience from "./formStep/formExperience";
import FormProject from "./formStep/formProject";
import Template1 from "../../../components/home/templateResume/template1";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createResume } from "../../../services/resumeService";
import { useReactToPrint } from "react-to-print";
import { FormInput } from "../../../components/customize/FormInput";
import { FormFile } from "../../../components/customize/FormFile";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { hasValue } from "../../../utils/utils";
import { CircularWithValueLabel } from "../../../components/customize/loading";

export const ResumeForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.root.data);
  const { id } = useParams();
  const user = useSelector((state) => state.user?.login?.user);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState({
    nameCV: "",
    url: null,
  });
  const [error, setError] = useState({
    nameCV: "",
    url: "",
  });
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [, setIsSaved] = useState(false);
  const contentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef });
  const navigate = useNavigate();

  const validate = () => {
    let _error = {
      nameCV: "",
      url: "",
    };
    let isValid = true;
    const requiredFields = ["nameCV", "url"];

    requiredFields.forEach((field) => {
      if (!hasValue(resume[field])) {
        _error[field] = `${field} is required`;
        isValid = false;
      }
    });
    setError(_error);
    return isValid;
  };

  const steps = [
    {
      component: (
        <FormInfo
          formData={formData.personalInfo}
          setFormData={(data) => dispatch(setPersonalInfo(data))}
        />
      ),
      label: "Infomation",
    },
    {
      component: (
        <FormEducation
          formData={formData.education}
          setFormData={(data) => dispatch(setEducation(data))}
        />
      ),
      label: "Education",
    },
    {
      component: (
        <FormExperience
          formData={formData.experience}
          setFormData={(data) => dispatch(setExperience(data))}
        />
      ),
      label: "Experience",
    },
    {
      component: (
        <FormProject
          formData={formData.projects}
          setFormData={(data) => dispatch(setProjects(data))}
        />
      ),
      label: "Project",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (type) => {
    switch (type) {
      case "save":
        handlePrint();
        setIsSaved(true);
        break;
      case "submit":
        setOpen(true);
        break;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    if (validate()) {
      let res = await createResume({
        ...resume,
        status: "new",
        template: `template${id}`,
      });
      if (res && res.statusCode === 201) {
        toast.success(res.message);
        setOpen(false);
        setLoading(false);
        navigate(`/my-resume/${user?._id}`);
        setIsSaved(false);
        dispatch(clearData());
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsSaved(false);
    navigate("/resume");
    dispatch(clearData());
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={6}>
          <Typography variant="h4" align="center">
            {steps[currentStep].component}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{
            border: "1px solid #ccc",
          }}
        >
          <Template1 innerRef={contentRef} />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
          sx={{ display: "flex", justifyContent: "center", mt: 1 }}
        >
          <Button
            variant="contained"
            color="disabled"
            onClick={handlePrev}
            sx={{ mr: 1 }}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleSubmit("save")}
              >
                Save PDF
              </Button>
              <Button
                sx={{ ml: 1 }}
                variant="contained"
                color="primary"
                onClick={() => handleSubmit("submit")}
              >
                Save resume
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          )}
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => handleClose()}>
        {loading === true ? (
          <CircularWithValueLabel />
        ) : (
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
                data={resume}
                setData={setResume}
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
                data={resume}
                setData={setResume}
                error={error}
                setError={setError}
                required={true}
                file={file}
                setFile={setFile}
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
                onClick={() => handleSave()}
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
        )}
      </Modal>
    </Box>
  );
};
