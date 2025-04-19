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
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { getJobByID } from "../../../services/jobService";
import { getCompanyById } from "../../../services/companyService";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import styled from "@emotion/styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { formatDateData, getLevelStyles } from "../../../utils/utils";
import { Link } from "react-router-dom";

const TextClamp = styled((props) => <Typography component="span" {...props} />)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const JobDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getDetail = async (id) => {
    let res = await getJobByID(id);
    if (res && res.statusCode === 200) {
      let response = await getCompanyById(res.data.companyId);
      if (response && response.statusCode === 200) {
        setData({ ...res.data, company: response.data });
      } else {
        setData(res.data);
      }
    } else {
      toast.error(res.message);
    }
  };

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
            {/* Left column - job details */}
            <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {data.name}
                  </Typography>
                  <List
                    sx={{
                      "@media (max-width: 500px)": {
                        display: "block",
                      },
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ color: "#fff", bgcolor: "#6f42c1" }}>
                          <LocationCityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Location"
                        component={Box}
                        secondary={
                          <TextClamp title={data.address}>
                            {data.address}
                          </TextClamp>
                        }
                        sx={{ color: "#6f42c1" }}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ color: "#fff", bgcolor: "#6f42c1" }}>
                          <ContactPageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Experience"
                        secondary={data.experience}
                        sx={{ color: "#6f42c1" }}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ color: "#fff", bgcolor: "#6f42c1" }}>
                          <MonetizationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Salary"
                        secondary={data.salary}
                        sx={{ color: "#6f42c1" }}
                      />
                    </ListItem>
                  </List>
                  <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                    <Chip label={`Deadline: ${formatDateData(data.endDate)}`} />
                  </Stack>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <Button
                      variant="contained"
                      sx={{
                        flex: 5,
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#5a379e",
                        },
                        "@media (max-width: 500px)": {
                          flex: 4,
                        },
                      }}
                      startIcon={<TelegramIcon />}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        flex: 1,
                        borderColor: "#6f42c1",
                        color: "#6f42c1",
                      }}
                      startIcon={<FavoriteBorderIcon />}
                    >
                      Save
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ mt: 3 }}>
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

                  {/* Job Description */}
                  <Markdown rehypePlugins={[rehypeRaw]}>
                    {typeof data.description === "string"
                      ? data.description
                      : "No description available"}
                  </Markdown>

                  <Box mt={2}>
                    <Typography variant="p" fontWeight="bold" gutterBottom>
                      Work location
                    </Typography>
                    <Typography mb={2}>{data.address}</Typography>

                    <Typography variant="p" fontWeight="bold" gutterBottom>
                      Working time
                    </Typography>
                    <Typography mb={2}>
                      {data.workDay} ({data.workTime})
                    </Typography>

                    <Typography variant="p" fontWeight="bold" gutterBottom>
                      How to apply
                    </Typography>
                    <Typography mb={2}>
                      Submit your application online by clicking{" "}
                      <strong>Apply</strong> below.
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={2}>
                      Application Deadline:{" "}
                      <strong>
                        {new Date(data.endDate).toLocaleDateString("vi-VN")}
                      </strong>
                    </Typography>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{
                        alignItems: { xs: "stretch", sm: "center" },
                        justifyContent: "flex-start",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#6f42c1",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#5a379e",
                          },
                        }}
                      >
                        Apply Now
                      </Button>
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                      >
                        Save Job
                      </Button>
                      <Button fullWidth variant="outlined" color="warning">
                        View Applicants
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
              {data.company !== null && (
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={data.company?.image}
                        alt="Logo"
                        sx={{ width: 56, height: 56 }}
                      />
                      <Link
                        to={`/company/${data.companyId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography fontWeight="bold">
                          {data.company?.name}
                        </Typography>
                      </Link>
                    </Stack>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <GroupsIcon
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                        fontSize="small"
                      />{" "}
                      <Typography fontSize={14}>100-499 employees</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <WorkIcon
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                        fontSize="small"
                      />{" "}
                      <Typography fontSize={14}>
                        {data.company?.speciality}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <PlaceIcon
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                        fontSize="small"
                      />{" "}
                      <Typography fontSize={14}>
                        {data.company?.address}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <PhoneIphoneIcon
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                        fontSize="small"
                      />{" "}
                      <Typography fontSize={14}>
                        {data.company?.phone}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}

              <Card sx={{ marginBottom: 3 }}>
                <CardContent>
                  <Typography fontWeight="bold" gutterBottom>
                    General Information
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <WorkIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography>Level: </Typography>
                    <Typography
                      fontSize={14}
                      sx={{
                        m: 0,
                        display: "inline-block",
                        padding: "4px 12px",
                        minWidth: "80px",
                        textAlign: "center",
                        borderRadius: 2,
                        ...getLevelStyles(data.level),
                      }}
                    >
                      {data.level}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <SchoolIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>
                      Education: {data.education}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <GroupsIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>
                      Number: {data.quantity} person
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <AccessTimeIcon
                      sx={{
                        color: "#6f42c1",
                      }}
                    />{" "}
                    <Typography fontSize={14}>Step: {data.step}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}></Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography fontWeight="bold" gutterBottom>
                    Category
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                    {["Software", "Software engineer", "IT jobs"].map(
                      (item, index) => (
                        <Chip key={index} label={item} variant="outlined" />
                      )
                    )}
                  </Box>

                  <Typography fontWeight="bold" gutterBottom>
                    Skills
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {data.listSkill &&
                      data.listSkill.length > 0 &&
                      data.listSkill.map((skill, index) => (
                        <Chip key={index} label={skill} variant="outlined" />
                      ))}
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
