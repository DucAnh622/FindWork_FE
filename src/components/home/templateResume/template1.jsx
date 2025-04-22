import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import { formatDay, checkDataExist } from "../../../utils/utils";
import rehypeRaw from "rehype-raw";
import { EmptyData } from "../../../components/shared/emptyData";

const Template1 = (props) => {
  const data = useSelector((state) => state.root.data);

  if (checkDataExist(data)) {
    return <EmptyData />;
  }

  return (
    <>
      {data && (
        <Box
          ref={props.innerRef}
          sx={{
            p: 4,
            fontFamily: "Arial, sans-serif",
            maxWidth: "800px",
            width: "100%",
            mx: "auto",
            backgroundColor: "#fff",
          }}
        >
          {/* Header */}
          <Typography variant="h4" align="center" fontWeight="bold">
            {data.personalInfo?.fullname || ""}
          </Typography>
          <Typography align="center">{data.personalInfo.target}</Typography>
          <Typography align="center">
            {data.personalInfo?.phone || ""} | {data.personalInfo?.email || ""}|{" "}
            {data.personalInfo?.github || ""}
          </Typography>
          <Typography align="center" sx={{ mb: 2 }}>
            {data.personalInfo?.address || ""}
          </Typography>

          {/* Objective */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ borderBottom: "2px solid #ccc", mb: 1 }}
          >
            OBJECTIVE
          </Typography>
          <Markdown rehypePlugins={[rehypeRaw]}>
            {data.personalInfo?.description || ""}
          </Markdown>

          {/* Experience */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ borderBottom: "2px solid #ccc", mb: 1, mt: 1 }}
          >
            EXPERIENCE
          </Typography>
          {data.experience?.map((item, index) => (
            <Box key={index}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography fontWeight="bold">{item.company}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {formatDay(item.start)} - {formatDay(item.end)}
                  </Typography>
                </Grid>
              </Grid>
              <Typography fontStyle="italic">{item.position}</Typography>
              <Markdown rehypePlugins={[rehypeRaw]}>
                {item.description}
              </Markdown>
            </Box>
          ))}

          {/* Education */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ borderBottom: "2px solid #ccc", mt: 1 }}
          >
            EDUCATION
          </Typography>
          {data.education?.map((item, index) => (
            <Box key={index} mt={1}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography fontWeight="bold">{item.university}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {formatDay(item.start)} - {formatDay(item.end)}
                  </Typography>
                </Grid>
              </Grid>
              <Typography>{item.speciality}</Typography>
              <Typography>Grade: {item.gpa}</Typography>
            </Box>
          ))}

          {/* Projects */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ borderBottom: "2px solid #ccc", mt: 1 }}
          >
            PROJECTS
          </Typography>
          {data.projects?.map((item, index) => (
            <Box key={index} mt={1}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography fontWeight="bold">{item.project}</Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {formatDay(item.start)} - {formatDay(item.end)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>{item.link}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{item.position}</Typography>
                </Grid>
              </Grid>
              <Markdown rehypePlugins={[rehypeRaw]}>
                {item.description}
              </Markdown>
            </Box>
          ))}

          {/* Skills */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ borderBottom: "2px solid #ccc", mb: 1 }}
          >
            SKILLS
          </Typography>
          <Markdown rehypePlugins={[rehypeRaw]}>
            {data.personalInfo?.skill}
          </Markdown>
        </Box>
      )}
    </>
  );
};

export default Template1;
