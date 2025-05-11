import "../assets/styles/homePage.scss";
import "swiper/css";
import "swiper/css/navigation";
import { FormFilterMultiple } from "../components/customize/FormFilterMultiple";
import { TextField, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { locations } from "../utils/constant";
import { MiniList } from "./home/home/MiniList";
import { MediumList, MediumList2 } from "./home/home/MediumList";
import { LargeList } from "./home/home/LargeList";

export const HomePage = () => {
  const [data, setData] = useState({
    address: [],
  });
  return (
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
            <MiniList />
          </div>
          <div className="banner-right">
            <div className="banner-right-item"></div>
            <div className="banner-right-item"></div>
          </div>
        </Box>
        <MediumList />
        <LargeList />
        <MediumList2 />
      </div>
    </div>
  );
};
