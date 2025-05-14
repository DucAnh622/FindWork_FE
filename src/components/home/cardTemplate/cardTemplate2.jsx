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
} from "@mui/material";
import { FavoriteBorderRounded } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { TextClamp, TextClamp2 } from "../../customize/TextClamp";
import AddIcon from "@mui/icons-material/Add";

export const CardTemplate2 = ({ data }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 345,
        width: "100%",
        height: "auto",
        m: "0 auto",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={data.image}
            aria-label="recipe"
            sx={{
              width: 40,
              height: 40,
              borderRadius: 0,
              "& img": {
                objectFit: "cover",
              },
            }}
          />
        }
        action={
          <IconButton
            size="small"
            aria-label="save"
            sx={{
              m: "8px 8px 8px 0",
              border: "1px solid #9d42ff",
              backgroundColor: "white",
              color: "#9d42ff",
              "&:hover": {
                backgroundColor: "#9d42ff",
                color: "white",
              },
              "&:disabled": {
                border: "1px solid #dee0e2",
                color: "#dee0e2",
                cursor: "not-allowed",
              },
            }}
          >
            <BookmarkBorderIcon fontSize="small" />
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
            {data.jobCount > 10 ? +10 : data.jobCount}{" "}
            <WorkIcon sx={{ ml: "2px" }} />
          </IconButton>
          <IconButton
            size="small"
            aria-label="add to favorites"
            sx={{
              m: "8px",
              border: "1px solid #9d42ff",
              backgroundColor: "white",
              color: "#9d42ff",
              "&:hover": {
                backgroundColor: "#9d42ff",
                color: "white",
              },
              "&:disabled": {
                border: "1px solid #dee0e2",
                color: "#dee0e2",
                cursor: "not-allowed",
              },
            }}
          >
            <FavoriteBorderRounded fontSize="small" />
          </IconButton>
        </Box>
        <Button
          component={Link}
          to={`/company/${data.id}`}
          size="small"
          sx={{
            mr: 1,
            border: "1px solid #9d42ff",
            backgroundColor: "white",
            color: "#9d42ff",
            "&:hover": {
              backgroundColor: "#9d42ff",
              color: "white",
            },
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};
