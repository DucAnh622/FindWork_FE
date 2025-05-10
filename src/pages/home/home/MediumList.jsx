import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Grid,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Avatar,
  Chip,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularWithValueLabel } from "../../../components/customize/loading";
import { FormSelect } from "../../../components/customize/FormSelect";
import { TextClamp2, TextClamp } from "../../../components/customize/TextClamp";
import { locations } from "../../../utils/constant";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export const MediumList = () => {
  const [address, setAddress] = useState("");
  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <Box className="list-medium">
      <div className="header-list">
        <div className="header-list-item">
          <h2>The top job</h2>
        </div>
        <div className="header-list-item">
          <Link style={{ float: "right" }}>Show all</Link>
        </div>
        <div className="header-list-item">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "4px 8px",
            }}
          >
            <p style={{ margin: "0 8px", fontSize: "14px", color: "#bbb" }}>
              <FilterListIcon
                sx={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              Filter by:
            </p>
            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={address}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <>Locations</>;
                  }
                  return selected;
                }}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "4px 24px 4px 8px",
                    fontSize: "14px",
                  },
                  border: "none",
                  outline: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    outline: "none",
                  },
                  "& .MuiList-root .MuiList-padding": {
                    paddingTop: "0 !important",
                    paddingBottom: "0 !important",
                  },
                }}
              >
                <MenuItem>Locations</MenuItem>
                {locations.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="header-list-item">
          <Box display="flex" gap={1}>
            <IconButton
              size="small"
              //   disabled={page === 0}
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              //   onClick={handleNextPage}
              //   disabled={page === totalPage - 1}
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </div>
      </div>
      <Grid container className="body-list">
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className="body-list-item">
          <div className="body-list-item-info">
            <img
              src="https://variety.com/wp-content/uploads/2019/03/konami-logo.0.0.jpg"
              alt="logo"
            />
            <div className="body-list-item-info-text">
              <TextClamp2>Dev IOS</TextClamp2>
              <TextClamp>Facebook</TextClamp>
            </div>
          </div>
          <div className="body-list-item-option">
            <div className="body-list-item-chip">
              <Chip label="200 - 300 $" sx={{ mr: 1 }} />
              <Chip label="Fulltime" />
            </div>
            <IconButton
              size="small"
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <IconButton
              size="small"
              //   disabled={page === 0}
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
            <p>4/16</p>
            <IconButton
              size="small"
              //   onClick={handleNextPage}
              //   disabled={page === totalPage - 1}
              sx={{
                border: "1px solid #9d42ff",
                backgroundColor: "white",
                color: "#9d42ff",
                "&:hover": {
                  backgroundColor: "#9d42ff",
                  color: "white",
                },
                "&:disabled": {
                  borderColor: "gray",
                  color: "gray",
                  cursor: "not-allowed",
                },
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
