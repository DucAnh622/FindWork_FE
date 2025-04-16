import { useDispatch, useSelector } from "react-redux";
import { getListCompanyRedux } from "../redux/slices/companySlice";
import { getListJobRedux } from "../redux/slices/jobSlice";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Card,
  CardActions,
  Button,
  Box,
  IconButton,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { SliderCustomize } from "../components/home/slider/slider";

export const HomePage = () => {
  const listCompany = useSelector((state) => state.company?.listCompany);
  const listJob = useSelector((state) => state.job?.listJob);
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
      <Box></Box>
      {/* <SliderCustomize
        type="banner"
        template="banner"
        list={images}
        slidesPerView={1}
        spaceBetween={0}
      /> */}
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
    </>
  );
};
