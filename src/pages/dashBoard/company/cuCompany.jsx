import "../../../assets/styles/dashBoard.scss";
import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  createCompany,
  getCompanyById,
  updateCompany,
} from "../../../services/companyService";
import { getListAllSpeciality } from "../../../services/specialityService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FormInput } from "../../../components/customize/FormInput";
import { FormSelect } from "../../../components/customize/FormSelect";
import { formatList, hasValue } from "../../../utils/utils";
import { FormEditor } from "../../../components/customize/FormEditor";
import { FormImage } from "../../../components/customize/FormImage";

export const CuCompany = () => {
  const dataDefault = {
    name: "",
    image: "",
    address: "",
    phone: "",
    specialityId: "",
    description: "",
  };

  const errorDefault = {
    name: "",
    image: "",
    address: "",
    phone: "",
    specialityId: "",
    description: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(errorDefault);
  const [type, setType] = useState(false);
  const [listSpeciality, setListSpeciality] = useState([]);

  const getAllSpeciality = async () => {
    let res = await getListAllSpeciality();
    if (res && res.statusCode === 200) {
      setListSpeciality(res.data);
    }
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
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <FormSelect
            data={data}
            setData={setData}
            name="specialityId"
            label="Speciality"
            options={formatList(listSpeciality)}
            error={error}
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
