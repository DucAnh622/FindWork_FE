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
import { MultipleSelectBox } from "../../../components/customize/selectMultipleCheckBox";
import { useSelector, useDispatch } from "react-redux";
import { getListJobRedux, changePage } from "../../../redux/slices/jobSlice";
import { useParams } from "react-router-dom";
import { levels } from "../../../utils/constant.js";
import { formatList } from "../../../utils/utils.js";
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

  const handleChangeSelect = (e, value) => {};

  const handleChangeSelectBlur = () => {};

  console.log(levels);

  return (
    <div className="ContentPage">
      <Box display={"flex"} alignItems={"center"} sx={{ pl: 3, pr: 3, pt: 2 }}>
        <FormInput
          data={data}
          setData={setData}
          error={error}
          setError={setError}
          label="Search"
          name="keyword"
        />
        <MultipleSelectBox
          options={levels}
          label="Select level"
          value={data.level}
          width="100%"
          // error={error.level}
          // errorText={error.level}
          // onChange={handleChangeSelect}
          // handleBlurSelect={handleChangeSelectBlur}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          sx={{ height: "56px" }}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ px: 2, py: 2 }}>
        {isLoading === false ? (
          <>
            {list.length > 0 ? (
              <>
                <div className="custom-grid">
                  {list.map((item, index) => (
                    <div className="custom-grid-item" key={index}>
                      <CardTemplate3 data={item} />
                    </div>
                  ))}
                </div>
                {totalPage > 1 && (
                  <Stack spacing={2} alignItems="center">
                    <Pagination
                      count={totalPage}
                      page={page + 1}
                      onChange={(event, value) =>
                        dispatch(changePage(value - 1))
                      }
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                )}
              </>
            ) : (
              <>No data</>
            )}
          </>
        ) : (
          <CircularWithValueLabel />
        )}
      </Box>
    </div>
  );
};
