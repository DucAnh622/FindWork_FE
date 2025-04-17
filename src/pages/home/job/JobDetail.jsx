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
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { getJobByID } from "../../../services/jobService";
import { toast } from "react-toastify";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";

export const JobDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getDetail = async (id) => {
    let res = await getJobByID(id);
    if (res && res.statusCode === 200) {
      setData(res.data);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  return (
    <div className="ContentPage">
      {data !== null ? (
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Grid container spacing={3}>
            {/* Left column - job details */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {data.name}
                  </Typography>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    mb={2}
                  >
                    <Chip label={`Salary: ${data.salary}`} color="success" />
                    <Chip label={`Location: ${data.address}`} color="primary" />
                    <Chip
                      label={`Experience: ${data.experience}`}
                      color="info"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} flexWrap="wrap" mb={3}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#5a379e",
                        },
                      }}
                    >
                      Apply
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#6f42c1",
                        color: "#6f42c1",
                      }}
                    >
                      Save
                    </Button>
                    <Button variant="outlined" color="warning">
                      Show views
                    </Button>
                  </Stack>

                  {/* New section: Job Highlights */}
                  <Box mb={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Job Highlights
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                      <Chip
                        label={`Specialty: ${
                          data.position || "Frontend Developer"
                        }`}
                      />
                      <Chip label="IT - Software" />
                      <Chip label="Off on Saturdays" />
                    </Stack>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<NotificationsNoneOutlinedIcon />}
                      sx={{
                        borderRadius: 5,
                        borderColor: "#6f42c1",
                        color: "#6f42c1",
                      }}
                    >
                      Notify me of similar jobs
                    </Button>
                  </Box>

                  {/* Job Description */}
                  <Markdown rehypePlugins={[rehypeRaw]}>
                    {typeof data.description === "string"
                      ? data.description
                      : "No description available"}
                  </Markdown>

                  <Box mt={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Work Location
                    </Typography>
                    <Typography mb={2}>{data.address}</Typography>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Working Time
                    </Typography>
                    <Typography mb={2}>
                      {data.workDay} ({data.workTime})
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      How to Apply
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

                    <Stack direction="row" spacing={2}>
                      <Button
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
                        variant="outlined"
                        sx={{
                          borderColor: "#6f42c1",
                          color: "#6f42c1",
                        }}
                      >
                        Save Job
                      </Button>
                      <Button variant="outlined" color="warning">
                        View Applicants
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Avatar
                      src="https://cdn.itviec.com/employers/amela/logo/social/saRVvJdN3LNUVk8G2mVo1b9H/amela-logo.png"
                      alt="Logo"
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography fontWeight="bold">
                      AMELA TECHNOLOGY CORPORATION
                    </Typography>
                  </Stack>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <GroupsIcon fontSize="small" />{" "}
                    <Typography fontSize={14}>100-499 employees</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <WorkIcon fontSize="small" />{" "}
                    <Typography fontSize={14}>IT - Software</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <PlaceIcon fontSize="small" />{" "}
                    <Typography fontSize={14}>
                      5th Floor, Tower A, Keangnam Building, Me Tri, Nam Tu Liem
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Button variant="text" color="success" size="small">
                      View Company Page
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography fontWeight="bold" gutterBottom>
                    General Information
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <WorkIcon color="success" />{" "}
                    <Typography fontSize={14}>Level: Staff</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <SchoolIcon color="success" />{" "}
                    <Typography fontSize={14}>
                      Education: University+
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <GroupsIcon color="success" />{" "}
                    <Typography fontSize={14}>Hiring: 1 person</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <AccessTimeIcon color="success" />{" "}
                    <Typography fontSize={14}>Full-time</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>No data</>
      )}
    </div>
  );
};
