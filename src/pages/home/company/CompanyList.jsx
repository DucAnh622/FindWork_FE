import { useState, useEffect } from "react";
import "../../../assets/styles/dashBoard.scss";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getListCompanyRedux,
  changePage,
} from "../../../redux/slices/companySlice.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../../../assets/styles/JobList.scss";
import { CardTemplate2 } from "../../../components/home/cardTemplate/cardTemplate2";
import { SearchBar2 } from "../../../components/home/searchBar/searchBar2.jsx";
import { formatSort } from "../../../utils/utils.js";
import { EmptyData } from "../../../components/shared/emptyData.jsx";

export const CompanyList = () => {
  const dataDefault = {
    keyword: "",
    specialityId: "",
    address: [],
  };

  const [data, setData] = useState(dataDefault);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.company?.listCompany);
  const page = useSelector((state) => state.company?.page);
  const totalPage = useSelector((state) => state.company?.totalPage);
  const order = useSelector((state) => state.company?.order);
  const orderBy = useSelector((state) => state.company?.orderBy);
  const isLoading = useSelector((state) => state.company?.isLoading);

  const getList = async () => {
    dispatch(
      await getListCompanyRedux({
        page: page + 1,
        limit: 25,
        order: orderBy,
        sort: formatSort(order),
      })
    );
  };

  const handleSearch = async () => {
    dispatch(
      await getListCompanyRedux({
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
      <SearchBar2
        data={data}
        placeholder="Company"
        setData={setData}
        handleSearch={handleSearch}
      />
      <Box sx={{ px: 2, py: 2, height: "auto" }}>
        {isLoading === false ? (
          <>
            {list.length > 0 ? (
              <>
                <div className="custom-grid">
                  {list.map((item, index) => (
                    <div className="custom-grid-item" key={index}>
                      <CardTemplate2 data={item} />
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
              <EmptyData />
            )}
          </>
        ) : (
          <CircularWithValueLabel />
        )}
      </Box>
    </div>
  );
};
