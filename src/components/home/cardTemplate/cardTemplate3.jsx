import {
  Card,
  CardActions,
  Button,
  Box,
  IconButton,
  CardHeader,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { FavoriteBorderRounded } from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { getLevelStyles } from "../../../utils/utils";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { TextClamp } from "../../customize/TextClamp";

export const CardTemplate3 = ({ data, height }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        maxWidth: 345,
        maxHeight: 345,
        width: "100%",
        height: `${height}`,
        m: "16px auto",
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings" disabled>
            <TextClamp
              sx={{
                display: "inline-block",
                padding: "4px 12px",
                fontSize: "16px",
                minWidth: "80px",
                textAlign: "center",
                borderRadius: 2,
                ...getLevelStyles(data.level),
              }}
            >
              {data.level}
            </TextClamp>
          </IconButton>
        }
        title={
          <Link
            to={`/job/${data.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <TextClamp textAlign={"left"} title={data.name}>
              {data.name}
            </TextClamp>
          </Link>
        }
        subheader={
          <TextClamp textAlign={"left"} title={data.company}>
            {data.company}
          </TextClamp>
        }
      />
      <CardContent sx={{ pb: 0, pt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {data.skills.length > 0 &&
            data.skills.slice(0, isMobile ? 2 : 3).map((item, index) => {
              return (
                <Box
                  component={Button}
                  key={index}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, color: "#6f42c1", borderColor: "#6f42c1" }}
                >
                  <TextClamp
                    textAlign={"left"}
                    textTransform={"lowercase"}
                    sx={{ fontSize: 13 }}
                    title={item}
                  >
                    {item}
                  </TextClamp>
                </Box>
              );
            })}

          {data.skills.length > 3 && (
            <Box
              variant="outlined"
              size="small"
              display="flex"
              alignItems="center"
              sx={{ p: 0.2, borderRadius: "50%", border: "1px, solid #ccc" }}
              color="primary"
              title={data.skills}
            >
              <MoreHorizIcon />
            </Box>
          )}
        </Box>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteBorderRounded />
          </IconButton>
          <IconButton aria-label="save">
            <BookmarkBorderIcon />
          </IconButton>
        </Box>
        <Button size="small">Apply</Button>
      </CardActions>
    </Card>
  );
};
