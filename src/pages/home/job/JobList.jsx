import { useState, useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getListJobRedux, changePage } from "../../../redux/slices/jobSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/JobList.scss";
import { CardTemplate3 } from "../../../components/home/cardTemplate/cardTemplate3";
import { SearchBar1 } from "../../../components/home/searchBar/searchBar1.jsx";
import { formatSort } from "../../../utils/utils.js";

export const JobList = () => {
  const dataDefault = {
    keyword: "",
    level: [],
    address: [],
    step: [],
  };

  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.job?.listJob);
  const page = useSelector((state) => state.job?.page);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);

  const getList = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: 25,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handleSearch = async () => {
    dispatch(
      await getListJobRedux({
        page: page + 1,
        limit: 25,
        order: orderBy,
        sort: formatSort(order),
        data: data,
      })
    );
  };

  useEffect(() => {
    getList();
  }, [page, order, orderBy]);

  return (
    <div className="ContentPage">
      <SearchBar1
        data={data}
        placeholder="Job"
        setData={setData}
        handleSearch={handleSearch}
      />
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
