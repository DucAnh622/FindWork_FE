import {
  Card,
  CardActions,
  Button,
  Box,
  IconButton,
  CardHeader,
  Avatar,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FavoriteBorderRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

const TextClamp = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextClamp2 = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  text-overflow: ellipsis;
`;

export const CardTemplate2 = ({ data }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 345,
        width: "100%",
        height: "100%",
        m: "16px auto",
      }}
    >
      <CardHeader
        avatar={<Avatar src={data.image} aria-label="recipe" />}
        action={
          <IconButton aria-label="save">
            <BookmarkBorderIcon />
          </IconButton>
        }
        title={
          <Link
            to={`/company/${data.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <TextClamp textAlign={"left"} title={data.name}>
              {data.name}
            </TextClamp>
          </Link>
        }
        subheader={
          <TextClamp textAlign={"left"} title={data.speciality}>
            {data.speciality}
          </TextClamp>
        }
      />

      <CardMedia
        component="img"
        height="140"
        image={data.image}
        alt="Paella dish"
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ paddingBottom: 0 }}>
        <TextClamp2
          variant="body2"
          color="text.secondary"
          textAlign={"left"}
          title={data.description}
        >
          <Markdown rehypePlugins={[rehypeRaw]}>{data.description}</Markdown>
        </TextClamp2>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton disabled aria-label="add to favorites">
            {data.jobCount > 10 ? +10 : data.jobCount} <WorkIcon />
          </IconButton>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderRounded />
          </IconButton>
        </Box>
        <Button component={Link} to={`/company/${data.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};
