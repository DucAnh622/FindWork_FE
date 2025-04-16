import {
  Card,
  CardActions,
  Button,
  Box,
  IconButton,
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";
import {
  FavoriteBorderRounded,
  ShareOutlined,
  MoreVert,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

export const CardTemplate1 = ({ data }) => {
  const user = useSelector((state) => state.user?.login?.user);
  return (
    <Card sx={{ maxWidth: 300, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar
            src={
              user?.image
            }
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={data.nameCV}
        subheader={data.template}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "1rem",
        }}
      >
        <CardActions>
          <Button size="small">View</Button>
        </CardActions>

        <Box>
          <IconButton>
            <FavoriteBorderRounded />
          </IconButton>
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
