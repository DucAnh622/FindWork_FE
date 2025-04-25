import "../../../assets/styles/dashBoard.scss";
import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { createJob, updateJob, getJobByID } from "../../../services/jobService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FormEditor } from "../../../components/customize/FormEditor";
import {
  formatList,
  formatExperience,
  formatSalary,
  concatString,
  formatWorkDay,
  hasValue,
  divideSalary,
  divideWorkDay,
  divideString,
  divideExperience,
  formatDate,
} from "../../../utils/utils";
import { CustomRangeSelect } from "../../../components/customize/FormRangeSelect";
import {
  days,
  experiences,
  method,
  levels,
  educations,
  typeSalaries,
  typeExperiences,
} from "../../../utils/constant";
import { FormSelect } from "../../../components/customize/FormSelect";
import { FormRangeInput } from "../../../components/customize/FormRangeInput";
import { FormRangeTime } from "../../../components/customize/FormRangeTime";
import { FormInput } from "../../../components/customize/FormInput";
import { FormMultipleSelect } from "../../../components/customize/FormMultipleSelect";
import { FormMultipleSelectInfinity } from "../../../components/customize/FormMultipleSelectInfinity";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSkillRedux,
  getListSkillRedux,
} from "../../../redux/slices/skillSlice";
import { getAllCompanyRedux } from "../../../redux/slices/companySlice";

export const CuJob = () => {
  const { id } = useParams();
  const [typeExperience, setTypeExperience] = useState(false);
  const [typeSalary, setTypeSalary] = useState(false);
  const dataDefault = {
    name: "",
    address: "",
    companyId: "",
    level: "",
    ...(typeExperience === false && { minExperience: "", maxExperience: "" }),
    ...(typeSalary === false && { minSalary: "", maxSalary: "" }),
    quantity: "",
    description: "",
    startDate: "",
    endDate: "",
    education: "",
    step: "",
    dayWorkStart: "",
    dayWorkEnd: "",
    timeWorkStart: "",
    timeWorkEnd: "",
    skills: [],
  };

  const errorDefault = {
    name: "",
    address: "",
    companyId: "",
    description: "",
    level: "",
    status: "",
    quantity: "",
    startDate: "",
    endDate: "",
    education: "",
    step: "",
    dayWorkStart: "",
    dayWorkEnd: "",
    timeWorkStart: "",
    timeWorkEnd: "",
    skills: "",
    ...(typeExperience === false && { minExperience: "", maxExperience: "" }),
    ...(typeSalary === false && { minSalary: "", maxSalary: "" }),
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listSkill = useSelector((state) => state.skill?.arrSkill);
  const listCompany = useSelector((state) => state.company?.arrCompany);
  const [data, setData] = useState(dataDefault);
  const [error, setError] = useState(errorDefault);
  const [type, setType] = useState(false);

  const getListSkill = useCallback(
    async (page, limit) => {
      return await dispatch(
        getListSkillRedux({
          page: page || 1,
          limit: limit || 10,
          order: "createdAt",
          sort: "desc",
        })
      );
    },
    [dispatch]
  );

  const getListAll = async () => {
    dispatch(await getAllSkillRedux());
    dispatch(await getAllCompanyRedux());
  };

  useEffect(() => {
    getListAll();
  }, []);

  useEffect(() => {
    if (id) {
      getDetailJob(id);
    }
  }, [id]);

  const getDetailJob = async (id) => {
    let res = await getJobByID(id);
    if (res && res.statusCode === 200) {
      const {
        startDate,
        endDate,
        workDay,
        workTime,
        salary,
        experience,
        ...result
      } = res.data;
      const { minExperience, maxExperience } = divideExperience(
        res.data.experience
      );
      const { minSalary, maxSalary } = divideSalary(res.data.salary);
      const { dayWorkStart, dayWorkEnd } = divideWorkDay(res.data.workDay);
      const { timeWorkStart, timeWorkEnd } = divideString(res.data.workTime);
      setData({
        ...result,
        startDate: formatDate(res.data.startDate),
        endDate: formatDate(res.data.endDate),
        minExperience,
        maxExperience,
        minSalary,
        maxSalary,
        dayWorkStart,
        dayWorkEnd,
        timeWorkStart,
        timeWorkEnd,
      });
      setType(true);
    } else {
      toast.error(res.message);
    }
  };

  const validate = () => {
    let _error = { ...errorDefault };
    let isValid = true;

    const requiredFields = [
      "name",
      "companyId",
      "level",
      "quantity",
      "startDate",
      "endDate",
      "education",
      "step",
      "description",
      "address",
      "skills",
      ...(typeSalary === false ? ["minSalary", "maxSalary"] : []),
      ...(typeExperience === false ? ["minExperience", "maxExperience"] : []),
      "dayWorkStart",
      "dayWorkEnd",
      "timeWorkStart",
      "timeWorkEnd",
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
    type === true && getDetailJob(id);
    setError(errorDefault);
    setData(dataDefault);
    navigate("/dashboard/job");
    setTypeExperience(false);
    setTypeSalary(false);
  };

  const handleSubmit = async () => {
    if (validate()) {
      const {
        minExperience,
        maxExperience,
        minSalary,
        maxSalary,
        dayWorkStart,
        dayWorkEnd,
        timeWorkStart,
        timeWorkEnd,
        quantity,
        skills,
        ...newData
      } = data;
      let res =
        type === true
          ? await updateJob({
              ...newData,
              skills: data.skills.map(Number),
              quantity: +data.quantity,
              salary: formatSalary(
                typeSalary === false ? data.minSalary : "0",
                typeSalary === false ? data.maxSalary : "0"
              ),
              experience: formatExperience(
                typeExperience === false ? data.minExperience : "0",
                typeExperience === false ? data.maxExperience : "0"
              ),
              workTime: concatString(data.timeWorkStart, data.timeWorkEnd),
              workDay: formatWorkDay(data.dayWorkStart, data.dayWorkEnd),
            })
          : await createJob({
              ...newData,
              skills: data.skills.map(Number),
              quantity: +data.quantity,
              salary: formatSalary(
                typeSalary === false ? data.minSalary : "0",
                typeSalary === false ? data.maxSalary : "0"
              ),
              experience: formatExperience(
                typeExperience === false ? data.minExperience : "0",
                typeExperience === false ? data.maxExperience : "0"
              ),
              workTime: concatString(data.timeWorkStart, data.timeWorkEnd),
              workDay: formatWorkDay(data.dayWorkStart, data.dayWorkEnd),
            });
      if (res && res.statusCode === 200) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
        setTypeExperience(false);
        setTypeSalary(false);
      } else if (res.statusCode === 201) {
        toast.success(res.message);
        setData(dataDefault);
        setError(errorDefault);
        setTypeExperience(false);
        setTypeSalary(false);
      } else {
        toast.error(res.message);
        setData(dataDefault);
        setError(errorDefault);
        setTypeExperience(false);
        setTypeSalary(false);
      }
      type === true && getDetailJob(id);
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
            {type === true ? "Update job" : "Create job"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #333" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ mb: 2 }}>
              <strong>Infomation</strong>
            </InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  label="Name"
                  placeholder="Developer"
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
              <Grid item xs={12} md={3} lg={3}>
                <FormSelect
                  data={data}
                  required={true}
                  setData={setData}
                  name="level"
                  label="Level"
                  options={levels}
                  error={error}
                  setError={setError}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormSelect
                  data={data}
                  required={true}
                  setData={setData}
                  name="education"
                  label="Education"
                  options={educations}
                  error={error}
                  setError={setError}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormSelect
                  data={data}
                  required={true}
                  setData={setData}
                  name="companyId"
                  label="Company"
                  options={formatList(listCompany)}
                  error={error}
                  setError={setError}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormSelect
                  data={data}
                  setData={setData}
                  name="step"
                  label="Step"
                  options={method}
                  error={error}
                  setError={setError}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormInput
                  label="Quanity"
                  placeholder="1"
                  maxLength={2}
                  type="number"
                  name="quantity"
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
                md={3}
                lg={3}
                sx={{ display: "flex", alignItems: "flex-start" }}
              >
                <FormMultipleSelect
                  data={data}
                  setData={setData}
                  name="skills"
                  label="Select skills"
                  required={true}
                  options={formatList(listSkill)}
                  error={error}
                  setError={setError}
                />
                {/* <FormMultipleSelectInfinity
                  data={data}
                  setData={setData}
                  name="skills"
                  selected={data.listSkill && formatList(data.listSkill)}
                  label="Select skills"
                  required={true}
                  getList={getListSkill}
                  error={error}
                  setError={setError}
                /> */}
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormInput
                  label="Address"
                  placeholder="Location"
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
              <Grid item xs={12} md={12} lg={6}>
                <FormRangeInput
                  label="term"
                  data={data}
                  setData={setData}
                  error={error}
                  nameFrom="startDate"
                  nameTo="endDate"
                  type="date"
                  maxLength={10}
                  setError={setError}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #333" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ mb: 2 }}>
              <strong>Experience</strong>
            </InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Type experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Experience"
                    value={typeExperience}
                    name="typeExperience"
                    required
                    onChange={(e) => setTypeExperience(e.target.value)}
                  >
                    {typeExperiences.map((item, index) => {
                      return (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {typeExperience === false && (
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <CustomRangeSelect
                    label="experience"
                    options={experiences}
                    nameFrom="minExperience"
                    nameTo="maxExperience"
                    data={data}
                    type={"Experience"}
                    setData={setData}
                    error={error}
                    setError={setError}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #333" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ mb: 2 }}>
              <strong>Salary</strong>
            </InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    Type salary
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Type salary"
                    value={typeSalary}
                    name="type salary"
                    required
                    onChange={(e) => setTypeSalary(e.target.value)}
                  >
                    {typeSalaries.map((item, index) => {
                      return (
                        <MenuItem value={item.value} key={index}>
                          {item.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              {typeSalary === false && (
                <Grid item xs={12} md={8} lg={8}>
                  <FormRangeInput
                    label="salary"
                    data={data}
                    setData={setData}
                    error={error}
                    nameFrom="minSalary"
                    nameTo="maxSalary"
                    type="number"
                    maxLength={4}
                    setError={setError}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #333" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ mb: 2 }}>
              <strong>Working time</strong>
            </InputLabel>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CustomRangeSelect
                  label="day work"
                  options={days}
                  nameFrom="dayWorkStart"
                  nameTo="dayWorkEnd"
                  data={data}
                  setData={setData}
                  type="Day"
                  error={error}
                  setError={setError}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <FormRangeTime
                  label="time"
                  data={data}
                  setData={setData}
                  error={error}
                  nameFrom="timeWorkStart"
                  nameTo="timeWorkEnd"
                  setError={setError}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #333" }}>
            <InputLabel id="demo-simple-select-helper-label" sx={{ mb: 2 }}>
              <strong>Description</strong>
            </InputLabel>
            <Grid container>
              <FormEditor
                name="description"
                data={data}
                setData={setData}
                error={error}
                label="Description"
                setError={setError}
              />
            </Grid>
          </Box>
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
