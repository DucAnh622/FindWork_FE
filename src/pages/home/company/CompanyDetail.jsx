import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  getListJobByCompanyRedux,
  changePage,
} from "../../../redux/slices/jobSlice";
import Pagination from "@mui/material/Pagination";
import { getCompanyById } from "../../../services/companyService";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import styled from "@emotion/styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { CardTemplate4 } from "../../../components/home/cardTemplate/cardTemplate4";
import BoltIcon from "@mui/icons-material/Bolt";
import { useDispatch, useSelector } from "react-redux";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { formatSort } from "../../../utils/utils";

const TextClamp = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CompanyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const listJob = useSelector((state) => state.job?.listJobByCompany);
  const page = useSelector((state) => state.job?.page);
  const totalPage = useSelector((state) => state.job?.totalPage);
  const order = useSelector((state) => state.job?.order);
  const orderBy = useSelector((state) => state.job?.orderBy);
  const isLoading = useSelector((state) => state.job?.isLoading);
  const [data, setData] = useState({});
  const getDetail = async (id) => {
    let res = await getCompanyById(id);
    if (res && res.statusCode === 200) {
      setData(res.data);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    dispatch(
      getListJobByCompanyRedux({
        page: page + 1,
        limit: 10,
        order: orderBy,
        sort: formatSort(order),
        companyId: id,
      })
    );
  }, [id, page, order, orderBy]);

  useEffect(() => {
    getDetail(id);
  }, [id]);

  if (!data) {
    return <>No data</>;
  }

  return (
    <div className="ContentPage">
      {data && (
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ pb: "16px !important" }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                  >
                    {/* Avatar + Company Info */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ flex: 1 }}
                    >
                      <Avatar
                        src={data.image}
                        alt="Logo"
                        sx={{
                          width: { xs: 80, sm: 100 },
                          height: { xs: 80, sm: 100 },
                        }}
                      />
                      <Box>
                        <TextClamp
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            color: "#6f42c1",
                          }}
                        >
                          {data.name}
                        </TextClamp>
                        <TextClamp variant="body2">{data.speciality}</TextClamp>
                      </Box>
                    </Stack>

                    {/* Follow Button */}
                    <Box
                      sx={{
                        width: { xs: "100%", sm: "auto" },
                        mt: { xs: 2, sm: 0 },
                      }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth={true}
                        startIcon={<FavoriteBorderIcon />}
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                          "&:hover": {
                            backgroundColor: "#f3e8ff",
                            borderColor: "#6f42c1",
                          },
                        }}
                      >
                        Follow
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
              <Card mb={2}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ borderLeft: "6px solid #6f42c1", pl: 1 }}
                      fontWeight="bold"
                      gutterBottom
                    >
                      Job description
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 5,
                        borderColor: "#6f42c1",
                        color: "#6f42c1",
                      }}
                    >
                      <NotificationsNoneOutlinedIcon />
                    </Button>
                  </Box>
                  <Markdown rehypePlugins={[rehypeRaw]}>
                    {typeof data.description === "string"
                      ? data.description
                      : "No description available"}
                  </Markdown>
                </CardContent>
              </Card>
              {isLoading === true ? (
                <CircularWithValueLabel />
              ) : (
                <>
                  {listJob &&
                    listJob.length > 0 &&
                    listJob.map((item, index) => {
                      return (
                        <CardTemplate4 key={index} data={item} company={data} />
                      );
                    })}
                  {totalPage > 1 && (
                    <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
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
              )}
            </Grid>
            <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
              <Card sx={{ marginBottom: 3 }}>
                <CardContent sx={{ pb: "16px !important" }}>
                  <Typography fontWeight="bold" gutterBottom>
                    General Information
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <BoltIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>{data.speciality}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LocationCityIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <TextClamp title={data.address} fontSize={14}>
                      {data.address}
                    </TextClamp>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <PhoneIphoneIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>{data.phone}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <GroupsIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>100-499 employees</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}></Box>

                  <Typography fontWeight="bold" gutterBottom>
                    Category
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {["Software", "Software engineer", "IT jobs"].map(
                      (item, index) => (
                        <Chip key={index} label={item} variant="outlined" />
                      )
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
};
