import "../../../assets/styles/dashBoard.scss";
import { useState, useEffect, useCallback } from "react";
import { Grid, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "../../../services/companyService";
import {
  getAllSpecialityRedux,
  getListSpecialityRedux,
} from "../../../redux/slices/specialitySlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../components/customize/FormInput";
import { hasValue } from "../../../utils/utils";
import { FormEditor } from "../../../components/customize/FormEditor";
import { FormSelectInfinity } from "../../../components/customize/FormSelectInfinity";
import { FormImage } from "../../../components/customize/FormImage";
import { useDispatch } from "react-redux";

export const CuCompany = () => {
  const dispatch = useDispatch();
  const getListSpeciality = useCallback(
    async (page, limit) => {
      return await dispatch(
        getListSpecialityRedux({
          page: page || 1,
          limit: limit || 10,
          order: "name",
          sort: "asc",
        })
      );
    },
    [dispatch]
  );

  const dataDefault = {
    name: "",
    image: "",
    address: "",
    phone: "",
    specialityId: "",
    description: "",
    skillId: "",
  };

  const errorDefault = {
    name: "",
    image: "",
    address: "",
    phone: "",
    specialityId: "",
    description: "",
    skillId: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(errorDefault);
  const [type, setType] = useState(false);

  const getAllSpeciality = async () => {
    await dispatch(getAllSpecialityRedux());
  };

  const getDetailCompany = async (id) => {
    let res = await getCompanyById(id);
    if (res && res.statusCode === 200) {
      setData({ ...res.data });
      setType(true);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailCompany(id);
    }
  }, [id]);

  useEffect(() => {
    getAllSpeciality();
  }, []);

  const validate = () => {
    let _error = { ...errorDefault };
    let isValid = true;

    const requiredFields = [
      "name",
      "image",
      "phone",
      "specialityId",
      "address",
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

  const handleClose = async () => {
    type === true && getDetailCompany(id);
    setError(errorDefault);
    setData(dataDefault);
    navigate("/dashboard/company");
  };

  const handleSubmit = async () => {
    if (validate()) {
      let res =
        type === true ? await updateCompany(data) : await createCompany(data);

      if (res && res.statusCode === 200) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
        getDetailCompany(id);
      } else if (res.statusCode === 201) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
      } else {
        toast.error(res.message);
        setData(dataDefault);
        setError(errorDefault);
      }
    }
  };

  return (
    <div className="dashBoard">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            {type === true ? "Update company" : "Create company"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
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
        <Grid item xs={12} md={6} lg={6}>
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

        <Grid item xs={12} md={4} lg={4}>
          <FormImage
            label="Image url"
            data={data}
            setData={setData}
            error={error}
            setError={setError}
            type="text"
            required={true}
            maxLength={500}
            name="image"
            placeholder="image..."
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          lg={4}
          sx={{ display: "flex", alignItems: "flex-start" }}
        >
          <FormSelectInfinity
            data={data}
            required={true}
            setData={setData}
            name="specialityId"
            label="Speciality"
            getList={getListSpeciality}
            error={error}
            selected={
              data.speciality && {
                value: data.specialityId,
                label: data.speciality,
              }
            }
            setError={setError}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
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

        <Grid item xs={12} md={12} lg={12}>
          <FormEditor
            name="description"
            data={data}
            setData={setData}
            error={error}
            label="Description"
            setError={setError}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
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
            onClick={handleClose}
            color="error"
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
