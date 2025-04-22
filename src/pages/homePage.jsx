import { useDispatch, useSelector } from "react-redux";
import { getListCompanyRedux } from "../redux/slices/companySlice";
import { getListJobRedux } from "../redux/slices/jobSlice";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Box } from "@mui/material";
import { SliderCustomize } from "../components/home/slider/slider";
import { EmptyData } from "../components/shared/emptyData";
import { CircularWithValueLabel } from "../components/customize/loading";

export const HomePage = () => {
  const listCompany = useSelector((state) => state.company?.listCompany);
  const listJob = useSelector((state) => state.job?.listJob);
  const isLoadingC = useSelector((state) => state.company.isLoading);
  const isLoadingJ = useSelector((state) => state.job.isLoading);
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
              <Box></Box>
              <SliderCustomize
                type="card"
                info="Top"
                header="Jobs"
                route="/job"
                template="CardTemplate3"
                list={listJob}
                slidesPerView={5}
                spaceBetween={30}
              />
              <SliderCustomize
                type="card"
                info="Top"
                header="Companies"
                route="/company"
                template="CardTemplate2"
                list={listCompany}
                slidesPerView={5}
                spaceBetween={30}
              />
              <SliderCustomize
                type="card"
                info="Popular"
                header="Jobs"
                route="/job"
                template="CardTemplate3"
                list={listJob}
                slidesPerView={5}
                spaceBetween={30}
              />
              <SliderCustomize
                type="card"
                info="Best"
                header="Companies"
                route="/company"
                template="CardTemplate2"
                list={listCompany}
                slidesPerView={5}
                spaceBetween={30}
              />
            </div>
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </>
  );
};
