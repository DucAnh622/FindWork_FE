import React, { useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardTemplate2 } from "../cardTemplate/cardTemplate2";
import { CardTemplate3 } from "../cardTemplate/cardTemplate3";
import { Link as RouterLink } from "react-router-dom";

export const SliderCustomize = ({
  type,
  header,
  route,
  info,
  list,
  template,
  slidesPerView,
  spaceBetween,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <>
      {type === "card" && (
        <Box
          sx={{
            display: "flex",
            p: 2,
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            alignItems: "center",
            maxWidth: "calc(100% - 32px)",
            margin: "16px auto",
            justifyContent: "space-between",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">
              {info}{" "}
              <Box component="span" sx={{ color: "#6f42c1" }}>
                {header}
              </Box>
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to={route}
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#6f42c1",
              "&:hover": {
                backgroundColor: "#5a379f",
              },
              borderRadius: "8px",
              px: 3,
            }}
          >
            All
          </Button>
        </Box>
      )}
      {list && list.length > 0 && (
        <Box
          sx={
            type === "banner"
              ? {
                  height: "calc(100vh - 69px)",
                  position: "relative",
                  overflow: "hidden",
                  border: "none",
                }
              : {
                  maxWidth: "calc(100% - 32px)",
                  margin: "auto",
                  position: "relative",
                  border: "none",
                }
          }
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={
              type === "card" && {
                0: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2,
                },
                900: {
                  slidesPerView: 3,
                },
                1300: {
                  slidesPerView: 4,
                },
                1500: {
                  slidesPerView: 5,
                },
              }
            }
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            loop={true}
            style={{ height: "100%" }}
          >
            {list.map((item, index) => (
              <SwiperSlide key={index}>
                {template === "CardTemplate2" ? (
                  <CardTemplate2 data={item} />
                ) : template === "CardTemplate3" ? (
                  <CardTemplate3 data={item} height="100%" />
                ) : (
                  <img
                    src={item}
                    loading="lazy"
                    alt={`slide-${index}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "0",
              right: "0",
              display: "flex",
              justifyContent: "space-between",
              px: 2,
              transform: "translateY(-50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <Button
              ref={prevRef}
              sx={{
                pointerEvents: "auto",
                color: "white",
                opacity: 0.5,
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": {
                  opacity: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                  opacity: 1,
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.2s ease",
              }}
            >
              <ArrowBackIosIcon /> Prev
            </Button>

            <Button
              ref={nextRef}
              sx={{
                pointerEvents: "auto",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.6)",
                },
                "&:active": {
                  transform: "scale(0.95)",
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: "all 0.2s ease",
              }}
            >
              Next <ArrowForwardIosIcon />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
