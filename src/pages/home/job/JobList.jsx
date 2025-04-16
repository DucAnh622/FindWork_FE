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
import { CircularWithValueLabel } from "../../../components/customize/loading";
import {
  Grid,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { FormSelect } from "../../../components/customize/FormSelect";
import { useSelector, useDispatch } from "react-redux";
import {
  getListJobRedux,
  changePage,
  changeRowPerPage,
  changeSort,
  changeOrder,
} from "../../../redux/slices/jobSlice";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/JobList.scss";
import { CardTemplate3 } from "../../../components/home/cardTemplate/cardTemplate3";

export const JobList = () => {
  const errorDefault = {
    keyword: "",
    level: [],
    address: [],
    step: [],
  };

  const dataDefault = {
    keyword: "",
    level: [],
    address: [],
    step: [],
  };

  const [error, setError] = useState(errorDefault);
  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const { id } = useParams();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const limit = useSelector((state) => state.job?.limit);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);

  const getList = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: limit,
        order: orderBy,
        sort: order,
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page, limit, order, orderBy]);

  return (
    <div className="ContentPage">
      <Box sx={{ px: 2, py: 2 }}>
        <div className="custom-grid">
          {list.map((item, index) => (
            <div className="custom-grid-item" key={index}>
              <CardTemplate3 data={item}/>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};
