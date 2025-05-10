import "../assets/styles/homePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListCompanyRedux } from "../redux/slices/companySlice";
import {
  getListSpecialityRedux,
  changePage,
  changeRowPerPage,
} from "../redux/slices/specialitySlice";
import { getListJobRedux } from "../redux/slices/jobSlice";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { SliderCustomize } from "../components/home/slider/slider";
import { EmptyData } from "../components/shared/emptyData";
import { CircularWithValueLabel } from "../components/customize/loading";
import { FormFilterMultiple } from "../components/customize/FormFilterMultiple";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { locations } from "../utils/constant";
import { MiniList } from "./home/home/MiniList";
import { MediumList } from "./home/home/MediumList";

export const HomePage = () => {
  const listCompany = useSelector((state) => state.company?.listCompany);
  const listJob = useSelector((state) => state.job?.listJob);
  const listSpeciality = useSelector(
    (state) => state.speciality?.listSpeciality
  );
  const isLoadingC = useSelector((state) => state.company.isLoading);
  const isLoadingJ = useSelector((state) => state.job.isLoading);
  const isLoadingS = useSelector((state) => state.speciality.isLoading);
  const totalPageS = useSelector((state) => state.speciality.totalPage);
  const pageS = useSelector((state) => state.speciality.page);

  const [data, setData] = useState({
    address: [],
  });

  const dispatch = useDispatch();
  const getList = async () => {
    await dispatch(getListCompanyRedux());
    await dispatch(getListJobRedux());
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {isLoadingC === true || isLoadingJ === true ? (
        <CircularWithValueLabel />
      ) : (
        <>
          {listCompany.length > 0 && listJob.length > 0 ? (
            <div className="ContentPage">
              <div className="container">
                <Box className="search-bar">
                  <div className="search-form">
                    <TextField
                      size="small"
                      placeholder="Search job title, company name"
                      sx={{
                        width: "100%",
                        mr: 1,
                        flex: 2,
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1f2937",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9d42ff",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9d42ff",
                          },
                        },
                      }}
                    />
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        p: 0,
                      }}
                    >
                      <FormFilterMultiple
                        name="address"
                        placeholder="Location"
                        list={locations}
                        data={data}
                        setData={setData}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        height: "40px",
                        border: "1px solid #9d42ff",
                        ml: 1,
                        borderColor: "transparent",
                        transition: "all 0.3s ease",
                        backgroundColor: "#9d42ff",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#9d42ff",
                          border: "1px solid #9d42ff",
                        },
                      }}
                      startIcon={<SearchIcon />}
                    >
                      Search
                    </Button>
                  </div>
                </Box>
                <Box className="banner">
                  <div className="banner-left">
                    <MiniList
                      list={listSpeciality}
                      getListRedux={getListSpecialityRedux}
                      isloading={isLoadingS}
                      changePage={changePage}
                      changeRowPerPage={changeRowPerPage}
                      totalPage={totalPageS}
                      page={pageS}
                    />
                  </div>
                  <div className="banner-right">
                    <div className="banner-right-item"></div>
                    <div className="banner-right-item"></div>
                  </div>
                </Box>
                <MediumList/>
                <SliderCustomize
                  type="card"
                  info="Top"
                  header="Jobs"
                  route="/job"
                  template="CardTemplate3"
                  list={listJob}
                  slidesPerView={4}
                  spaceBetween={30}
                />
                <SliderCustomize
                  type="card"
                  info="Top"
                  header="Companies"
                  route="/company"
                  template="CardTemplate2"
                  list={listCompany}
                  slidesPerView={4}
                  spaceBetween={30}
                />
                <SliderCustomize
                  type="card"
                  info="Popular"
                  header="Jobs"
                  route="/job"
                  template="CardTemplate3"
                  list={listJob}
                  slidesPerView={4}
                  spaceBetween={30}
                />
                <SliderCustomize
                  type="card"
                  info="Best"
                  header="Companies"
                  route="/company"
                  template="CardTemplate2"
                  list={listCompany}
                  slidesPerView={4}
                  spaceBetween={30}
                />
              </div>
            </div>
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </>
  );
};
