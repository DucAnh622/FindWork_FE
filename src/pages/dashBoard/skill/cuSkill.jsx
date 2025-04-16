import "../../../assets/styles/dashBoard.scss";
import { useState, useEffect } from "react";
import { Grid, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  createSkill,
  getSkillById,
  updateSkill,
} from "../../../services/skillService";
import { toast } from "react-toastify";
import { FormInput } from "../../../components/customize/FormInput";
import { hasValue } from "../../../utils/utils";

export const CuSkill = ({ skill, open, type, handleClose }) => {
  const dataDefault = {
    name: "",
    description: "",
  };

  const errorDefault = {
    name: "",
    description: "",
  };

  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(errorDefault);

  const getDetail = async (id) => {
    let res = await getSkillById(id);
    if (res && res.statusCode === 200) {
      setData({ ...res.data });
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (type === "Update") {
      getDetail(skill?.id);
    }
  }, [type]);

  const validate = () => {
    let _error = { ...errorDefault };
    let isValid = true;

    const requiredFields = [
      "name",
      "description",
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

  const handleCloseModal = () => {
    setError(errorDefault);
    setData(dataDefault);
    handleClose();
  };

  const handleSubmit = async () => {
    if (validate()) {
      let res =
        type === "Update"
          ? await updateSkill(data)
          : await createSkill(data);
      if (res && res.statusCode === 200) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
        getDetail(role.id);
        handleCloseModal();
      } else if (res.statusCode === 201) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
        handleCloseModal();
      } else {
        toast.error(res.message);
        setData(dataDefault);
        setError(errorDefault);
      }
    }
  };

  return (
    <Modal open={open} onClose={() => handleCloseModal()}>
      <Grid
        container
        spacing={2}
        sx={{
          width: { xs: "80%", sm: "50%", md: "50%", lg: "50%" },
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
        <Grid item xs={12} sx={{ p: 0, marginBottom: 2 }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            {type === "Update" ? "Update skill" : "Create skill"}
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ p: "0px !important", mb: 2 }}>
          <FormInput
            label="Name"
            placeholder="Name..."
            maxLength={100}
            type="text"
            name="name"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sx={{ p: "0px !important"}}>
          <FormInput
            label="Description"
            placeholder="Description..."
            maxLength={100}
            type="textarea"
            name="description"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            required={true}
            minRows={5}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end",}}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mr: 1 }}
            startIcon={<CheckIcon />}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            onClick={() => handleCloseModal()}
            color="error"
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};


